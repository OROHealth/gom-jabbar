package robots

import (
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

	return r
}

func (r *verduny) CutPotatoes(k resto.PotatoKind, s resto.PotatoCutSize, qty uint) resto.CuttedPotatoes {
	return resto.CuttedPotatoes{}
}
func (r *verduny) DipPotatoes(cp resto.CuttedPotatoes) resto.DippedPotatoes {
	return resto.DippedPotatoes{}
}
