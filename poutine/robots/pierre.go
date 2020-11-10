package robots

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
	"github.com/google/uuid"
)

type pierre struct {
	Robot
	Inventory *resto.Inventory
	Orders    sync.Map
}

func NewPierre(bus pubsub.Bus, inventory *resto.Inventory) Pierre {
	r := &pierre{
		Robot: Robot{
			bus: bus,
		},
		Inventory: inventory,
	}
	r.setHTTPHandlers()
	r.setSubscriptions()
	go r.watchOrders() //In real life I would do a mechanism to avoid that this goroutine leaks
	return r
}

func (r *pierre) setHTTPHandlers() {
	r.httpRoutes = []route{
		{method: "POST", path: "/orders", handler: r.httpTakeOrder},
		{method: "GET", path: "/orders/:id", handler: r.httpOrderStatus},
	}
}

func (r *pierre) setSubscriptions() {
	r.Subscribe("squeezed-cheese-ready", r.handleSqueezedCheese)
	r.Subscribe("gravy-scoops-ready", r.handleGravyScoop)
	r.Subscribe("fried-potatoes-ready", r.handleFriedPotato)
}

func (r *pierre) watchOrders() {
	for range time.Tick(time.Second) {
		r.Orders.Range(func(key, value interface{}) bool {
			if o, ok := value.(*resto.PoutineOrder); ok {
				if o.Status == resto.OrderStatusPending {
					if len(o.ReceivedIngredients) >= resto.NumberOfIngredientsInPoutine {
						r.DeliverOrder(o.ID)
					} else if time.Now().After(o.Received.Add(resto.OrderTimeout)) {
						//Order failed for some reason
						o.Status = resto.OrderStatusError
						r.Publish("order-timeout", o.ID)
					}
				}
			}
			return true
		})
	}
}

func (r *pierre) Order(id string) (o *resto.PoutineOrder, err error) {
	if v, ok := r.Orders.Load(id); !ok {
		err = fmt.Errorf("order not found %s", id)
	} else {
		var ok bool
		if o, ok = v.(*resto.PoutineOrder); !ok {
			err = fmt.Errorf("invalid object stored in order map at id %s", id)
		}
	}
	return
}

func (r *pierre) TakeOrder(o *resto.PoutineOrder) (string, error) {
	o.ID = strings.ToUpper(strings.ReplaceAll(uuid.New().String(), "-", "")[0:6])
	o.Received = time.Now()
	o.ValidateAndSetDefault()
	r.Orders.Store(o.ID, o)

	if err := r.Inventory.Deduct(o); err != nil {
		o.Status = resto.OrderStatusError
		return o.ID, err
	}

	o.Status = resto.OrderStatusPending

	if err := r.Publish("order-received", toJSON(o)); err != nil {
		o.Status = resto.OrderStatusError
		return o.ID, err
	}

	return o.ID, nil
}

func (r *pierre) DeliverOrder(id string) error {
	o, err := r.Order(id)
	if err != nil {
		return fmt.Errorf("delivering: %s", err)
	}

	r.Publish("mixing-ingredients-start", o.ID)
	poutine, err := r.MixIngredients(o.ReceivedIngredients)
	if err != nil {
		return err
	}
	r.Publish("mixing-ingredients-ready", o.ID)

	o.Status = resto.OrderStatusDelivered
	o.PoutineDelivered = poutine

	r.Publish("order-ready", o.ID)

	return nil
}

func (r *pierre) MixIngredients(igs []resto.Ingredient) (resto.Poutine, error) {
	if len(igs) < resto.NumberOfIngredientsInPoutine { //Need at least potatos, cheese and gravy
		return nil, fmt.Errorf("not enough ingredients to mix! (Got: %d)", len(igs))
	}

	return resto.Poutine(igs), nil
}

func (r *pierre) handleSqueezedCheese(msg string) error {
	m := resto.SqueezedCheeseCurdsReady{}
	fromJSON(&m, msg)

	o, err := r.Order(m.OrderID)
	if err != nil {
		return fmt.Errorf("received squeezed cheese: %s", err)
	}

	r.Publish("squeezed-cheese-received", m.OrderID)
	o.AppendIngredient(m.SqueezedCheeseCurds)

	return nil
}

func (r *pierre) handleGravyScoop(msg string) error {
	m := resto.GravyScoopsReady{}
	fromJSON(&m, msg)

	o, err := r.Order(m.OrderID)
	if err != nil {
		return fmt.Errorf("received gravy scoops: %s", err)
	}

	r.Publish("gravy-scoops-received", m.OrderID)
	o.AppendIngredient(m.GravyScoops)

	return nil
}

func (r *pierre) handleFriedPotato(msg string) error {
	m := resto.FriedPotatoesReady{}
	fromJSON(&m, msg)

	o, err := r.Order(m.OrderID)
	if err != nil {
		return fmt.Errorf("received fried potatoes: %s", err)
	}

	r.Publish("fried-potatoes-received", m.OrderID)
	o.AppendIngredient(m.FriedPotatoes)

	return nil
}

func (r *pierre) httpTakeOrder(w http.ResponseWriter, req *http.Request) {
	if req.Body == nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	defer req.Body.Close()

	var o *resto.PoutineOrder
	if err := json.NewDecoder(req.Body).Decode(&o); err != nil {
		log.Println(err)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	id, err := r.TakeOrder(o)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(struct {
		ID  string `json:"id"`
		Err error  `json:"err,omitempty"`
	}{id, err})
}

func (r *pierre) httpOrderStatus(w http.ResponseWriter, req *http.Request) {
	o, err := r.Order(r.urlParam(req, "id"))
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(o)
}
