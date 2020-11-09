package robots

import (
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
)

type verduny struct {
	Robot
}

func NewVerduny(bus pubsub.PubSub) Verduny {
	r := &verduny{
		Robot: Robot{
			bus: bus,
		},
	}

	r.setSubscriptions()
	return r
}

func (r *verduny) setSubscriptions() {
	r.Listen("order-received", r.handleOrderReceived)
}

func (r *verduny) handleOrderReceived(msg string) error {
	o := resto.PoutineOrder{}
	fromJSON(&o, msg)

	r.Send("cutted-potatoes-start", o.ID)
	cutted := r.CutPotatoes(o.Potato, o.PotatoCut, o.Size.Template().PotatoCount)
	r.Send("cutted-potatoes-ready", toJSON(resto.CuttedPotatoesReady{
		OrderID:        o.ID,
		CuttedPotatoes: cutted,
	}))

	r.Send("dipped-potatoes-start", o.ID)
	dipped := r.DipPotatoes(cutted, o.PotatoDip)
	return r.Send("dipped-potatoes-ready", toJSON(resto.DippedPotatoesReady{
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
func (r *verduny) DipPotatoes(cutted resto.CuttedPotatoes, d resto.PotatoDipKind) resto.DippedPotatoes {
	r.simulateWork(25 * time.Second)
	cutted.Dip = d
	return resto.DippedPotatoes(cutted)
}
