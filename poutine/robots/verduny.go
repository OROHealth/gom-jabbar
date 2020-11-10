package robots

import (
	"time"

	"github.com/dpatrie/gom-jabbar/poutine/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/resto"
)

type verduny struct {
	Robot
	dipTime time.Duration
}

func NewVerduny(bus pubsub.Bus) Verduny {
	r := &verduny{
		Robot: Robot{
			bus: bus,
		},
		dipTime: 25 * time.Second,
	}

	r.setSubscriptions()
	return r
}

func (r *verduny) setSubscriptions() {
	r.Subscribe("order-received", r.handleOrderReceived)
}

func (r *verduny) handleOrderReceived(msg string) error {
	o := resto.PoutineOrder{}
	fromJSON(&o, msg)

	r.Publish("cutted-potatoes-start", o.ID)
	cutted := r.CutPotatoes(o.Potato, o.PotatoCut, o.Size.Template().PotatoCount)
	r.Publish("cutted-potatoes-ready", toJSON(resto.CuttedPotatoesReady{
		OrderID:        o.ID,
		CuttedPotatoes: cutted,
	}))

	r.Publish("dipped-potatoes-start", o.ID)
	dipped := r.DipPotatoes(cutted, o.PotatoDip, r.dipTime)
	return r.Publish("dipped-potatoes-ready", toJSON(resto.DippedPotatoesReady{
		OrderID:        o.ID,
		DippedPotatoes: dipped,
	}))
}

func (r *verduny) CutPotatoes(k resto.PotatoKind, s resto.PotatoCutSize, qty uint) resto.CuttedPotatoes {
	r.simulateRandomWork()

	return resto.CuttedPotatoes{
		Kind:     k,
		CutSize:  s,
		Quantity: qty,
	}
}
func (r *verduny) DipPotatoes(cutted resto.CuttedPotatoes, dip resto.PotatoDipKind, dipTime time.Duration) resto.DippedPotatoes {
	r.simulateWork(dipTime)
	cutted.Dip = dip
	return resto.DippedPotatoes(cutted)
}
