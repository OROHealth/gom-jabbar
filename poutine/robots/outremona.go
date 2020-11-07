package robots

import (
	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
)

type outremona struct {
	Robot
}

func NewOutremona(bus pubsub.PubSub) Outremona {
	r := &outremona{
		Robot: Robot{
			bus: bus,
		},
	}

	r.setSubscriptions()
	return r
}

func (r *outremona) setSubscriptions() {
	r.Listen("order-received", r.handleOrderStart)
}

func (r *outremona) handleOrderStart(msg string) error {
	o := resto.PoutineOrder{}
	fromJSON(&o, msg)

	return r.Send("squeezed-cheese-done", toJSON(
		resto.SqueezedCheeseCurdsReady{
			OrderID:             o.ID,
			SqueezedCheeseCurds: r.SqueezeCheese(r.PickCheese(o.Cheese, o.Size.Template().CurdsCount)),
		},
	))
}

func (r *outremona) PickCheese(kind resto.CheeseKind, qty uint) resto.CheeseCurds {
	r.simulateWork()
	//Inventory check is Pierre's responsability
	return resto.CheeseCurds{Kind: kind, Quantity: qty}
}

func (r *outremona) SqueezeCheese(curds resto.CheeseCurds) resto.SqueezedCheeseCurds {
	r.simulateWork()
	r.Send("cheese-screams", "I'm not a Montreal's bagel who are the best in the world, don't even talk to me about New York bagels, amateur!")
	return resto.SqueezedCheeseCurds(curds)
}
