package robots

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/google/uuid"
)

type Pierre struct {
	Robot
	Inventory RestaurantInventory
	Orders    map[string]*PoutineOrder //currently tracked orders. TODO: garbage collect (error and completed)
}

func NewPierre(bus pubsub.PubSub, inventory RestaurantInventory) *Pierre {
	p := &Pierre{
		Robot: Robot{
			bus: bus,
		},
		Inventory: inventory,
		Orders:    map[string]*PoutineOrder{},
	}
	p.setHTTPHandlers()
	p.setSubscriptions()
	return p
}

func (p *Pierre) setHTTPHandlers() {
	p.httpRoutes = []route{
		{method: "POST", path: "/orders", handler: p.httpTakeOrder},
		{method: "GET", path: "/orders", handler: p.httpOrderStatus},
		{method: "GET", path: "/orders/:id", handler: p.httpOrderStatus},
	}
}

func (p *Pierre) setSubscriptions() {
	p.Listen("outremona.squeezed-cheese-done", p.handleSqueezedCheese)
	p.Listen("oldoporto.gravy-scoop-done", p.handleGravyScoop)
	p.Listen("bizar.fried-potato-done", p.handleFriedPotato)
}

func (p *Pierre) TakeOrder(o *PoutineOrder) (string, error) {
	o.ID = strings.ToUpper(strings.ReplaceAll(uuid.New().String(), "-", "")[0:6])
	p.Orders[o.ID] = o

	if err := p.Inventory.Check(o); err != nil {
		o.Status = StatusError
		return o.ID, err
	}

	if err := p.Send("pierre.order-start", ToJSON(o)); err != nil {
		o.Status = StatusError
		return o.ID, err
	}
	o.Status = StatusOrdered

	return o.ID, nil
}

func (p *Pierre) DeliverOrder(o PoutineOrder) (Poutine, error) {
	poutine, err := p.MixIngredients(o)
	if err != nil {
		return nil, err
	}

	o.Status = StatusCompleted
	o.poutine = poutine
	p.Send("pierre.order-done", ToJSON(o))

	return poutine, nil
}

func (p *Pierre) MixIngredients(o PoutineOrder) (Poutine, error) {
	if len(o.ingredients) < 3 { //Need at least potatos, cheese and gravy
		return nil, fmt.Errorf("not enough ingredients to mix! (Got: %d)", len(o.ingredients))
	}

	p.Send("pierre.mixing-ingredients-start", o.ID)
	time.Sleep(5 * time.Second)
	p.Send("pierre.mixing-ingredients-done", o.ID)

	return Poutine(o.ingredients), nil
}

func (p *Pierre) handleSqueezedCheese(msg string) error {
	m := SqueezedCheeseCurdsReady{}
	FromJSON(m, msg)

	if p.Orders[m.OrderID] == nil {
		return fmt.Errorf("received squeezed cheese for unknown order %s", m.OrderID)
	}
	p.Send("pierre.squeezed-cheese-received", m.OrderID)
	p.Orders[m.OrderID].ingredients = append(p.Orders[m.OrderID].ingredients, m.CheeseCurds)
	return nil
}

func (p *Pierre) handleGravyScoop(msg string) error {
	m := GravyScoopsReady{}
	FromJSON(m, msg)

	if p.Orders[m.OrderID] == nil {
		return fmt.Errorf("received gravy scoops for unknown order %s", m.OrderID)
	}

	p.Send("pierre.gravy-scoops-received", m.OrderID)
	p.Orders[m.OrderID].ingredients = append(p.Orders[m.OrderID].ingredients, m.GravyScoops)
	return nil
}

func (p *Pierre) handleFriedPotato(msg string) error {
	m := FriedPotatoesReady{}
	FromJSON(m, msg)

	if p.Orders[m.OrderID] == nil {
		return fmt.Errorf("received fried potatoes for unknown order %s", m.OrderID)
	}

	p.Send("pierre.fried-potatoes-received", m.OrderID)
	p.Orders[m.OrderID].ingredients = append(p.Orders[m.OrderID].ingredients, m.FriedPotatoes)
	return nil
}

func (p *Pierre) httpTakeOrder(w http.ResponseWriter, r *http.Request) {}

func (p *Pierre) httpOrderStatus(w http.ResponseWriter, r *http.Request) {}
