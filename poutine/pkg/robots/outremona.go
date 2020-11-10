package robots

import (
	"github.com/dpatrie/gom-jabbar/poutine/pkg/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/pkg/resto"
)

type outremona struct {
	Robot
}

func NewOutremona(bus pubsub.Bus) Outremona {
	r := &outremona{
		Robot: Robot{
			bus: bus,
		},
	}

	r.setSubscriptions()
	return r
}

func (r *outremona) setSubscriptions() {
	r.Subscribe("order-received", r.handleOrderReceived)
}

func (r *outremona) handleOrderReceived(msg string) error {
	o := resto.PoutineOrder{}
	fromJSON(&o, msg)

	return r.Publish("squeezed-cheese-ready", toJSON(
		resto.SqueezedCheeseCurdsReady{
			OrderID:             o.ID,
			SqueezedCheeseCurds: r.SqueezeCheese(r.PickCheese(o.Cheese, o.Size.Template().CurdsCount)),
		},
	))
}

func (r *outremona) PickCheese(kind resto.CheeseKind, qty uint) resto.CheeseCurds {
	r.simulateRandomWork()
	return resto.CheeseCurds{Kind: kind, Quantity: qty}
}

func (r *outremona) SqueezeCheese(curds resto.CheeseCurds) resto.SqueezedCheeseCurds {
	r.simulateRandomWork()
	r.Publish("cheese-screams", "I'm not a Montreal's bagel who are the best in the world, don't even talk to me about New York bagels, amateur!")
	return resto.SqueezedCheeseCurds(curds)
}
