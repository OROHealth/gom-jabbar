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

type Pierre struct {
	Robot
	Inventory resto.Inventory
	Orders    sync.Map
}

func NewPierre(bus pubsub.PubSub, inventory resto.Inventory) PierreRobot {
	p := &Pierre{
		Robot: Robot{
			bus: bus,
		},
		Inventory: inventory,
	}
	p.setHTTPHandlers()
	p.setSubscriptions()
	go p.watchOrders() //In real life I would do a mechanism to avoid that this goroutine leaks
	return p
}

func (p *Pierre) setHTTPHandlers() {
	p.httpRoutes = []route{
		{method: "POST", path: "/orders", handler: p.httpTakeOrder},
		{method: "GET", path: "/orders/:id", handler: p.httpOrderStatus},
	}
}

func (p *Pierre) setSubscriptions() {
	p.Listen("squeezed-cheese-done", p.handleSqueezedCheese)
	p.Listen("gravy-scoop-done", p.handleGravyScoop)
	p.Listen("fried-potato-done", p.handleFriedPotato)
}

func (p *Pierre) watchOrders() {
	for range time.Tick(time.Second) {
		p.Orders.Range(func(key, value interface{}) bool {
			if o, ok := value.(*resto.PoutineOrder); ok {
				if o.Status == resto.OrderStatusPending && len(o.ReceivedIngredients) >= resto.NumberOfIngredientsInPoutine {
					p.DeliverOrder(o.ID)
				}
			}
			return true
		})
	}
}

func (p *Pierre) Order(id string) (o *resto.PoutineOrder, err error) {
	if v, ok := p.Orders.Load(id); !ok {
		err = fmt.Errorf("order not found %s", id)
	} else {
		var ok bool
		if o, ok = v.(*resto.PoutineOrder); !ok {
			err = fmt.Errorf("invalid object stored in order map at id %s", id)
		}
	}
	return
}

func (p *Pierre) TakeOrder(o *resto.PoutineOrder) (string, error) {
	o.ID = strings.ToUpper(strings.ReplaceAll(uuid.New().String(), "-", "")[0:6])
	o.Received = time.Now()
	p.Orders.Store(o.ID, o)

	if err := p.Inventory.Check(o); err != nil {
		o.Status = resto.OrderStatusError
		return o.ID, err
	}

	o.Status = resto.OrderStatusPending

	if err := p.Send("order-start", ToJSON(o)); err != nil {
		o.Status = resto.OrderStatusError
		return o.ID, err
	}

	return o.ID, nil
}

func (p *Pierre) DeliverOrder(id string) error {
	o, err := p.Order(id)
	if err != nil {
		return fmt.Errorf("delivering: %s", err)
	}

	p.Send("mixing-ingredients-start", o.ID)
	poutine, err := p.MixIngredients(o.ReceivedIngredients)
	if err != nil {
		return err
	}
	p.Send("mixing-ingredients-done", o.ID)

	o.Status = resto.OrderStatusDelivered
	o.PoutineDelivered = poutine

	p.Send("order-done", o.ID)

	return nil
}

func (p *Pierre) MixIngredients(igs []resto.Ingredient) (resto.Poutine, error) {
	if len(igs) < resto.NumberOfIngredientsInPoutine { //Need at least potatos, cheese and gravy
		return nil, fmt.Errorf("not enough ingredients to mix! (Got: %d)", len(igs))
	}

	//Simulate some work
	time.Sleep(5 * time.Second)

	return resto.Poutine(igs), nil
}

func (p *Pierre) handleSqueezedCheese(msg string) error {
	m := resto.SqueezedCheeseCurdsReady{}
	FromJSON(&m, msg)

	o, err := p.Order(m.OrderID)
	if err != nil {
		return fmt.Errorf("received squeezed cheese: %s", err)
	}

	p.Send("squeezed-cheese-received", m.OrderID)
	o.AppendIngredient(m.CheeseCurds)

	return nil
}

func (p *Pierre) handleGravyScoop(msg string) error {
	m := resto.GravyScoopsReady{}
	FromJSON(&m, msg)

	o, err := p.Order(m.OrderID)
	if err != nil {
		return fmt.Errorf("received gravy scoops: %s", err)
	}

	p.Send("gravy-scoops-received", m.OrderID)
	o.AppendIngredient(m.GravyScoops)

	return nil
}

func (p *Pierre) handleFriedPotato(msg string) error {
	m := resto.FriedPotatoesReady{}
	FromJSON(&m, msg)

	o, err := p.Order(m.OrderID)
	if err != nil {
		return fmt.Errorf("received fried potatoes: %s", err)
	}

	p.Send("fried-potatoes-received", m.OrderID)
	o.AppendIngredient(m.FriedPotatoes)

	return nil
}

func (p *Pierre) httpTakeOrder(w http.ResponseWriter, r *http.Request) {
	if r.Body == nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var o *resto.PoutineOrder
	if err := json.NewDecoder(r.Body).Decode(&o); err != nil {
		log.Println(err)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	id, err := p.TakeOrder(o)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(struct {
		ID  string `json:"id"`
		Err error  `json:"err,omitempty"`
	}{id, err})
}

func (p *Pierre) httpOrderStatus(w http.ResponseWriter, r *http.Request) {
	o, err := p.Order(p.urlParam(r, "id"))
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(o)
}
