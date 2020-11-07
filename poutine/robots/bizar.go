package robots

import (
	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
)

type bizar struct {
	Robot
}

func NewBizar(bus pubsub.PubSub) Bizar {
	r := &bizar{
		Robot: Robot{
			bus: bus,
		},
	}

	return r
}

func (r *bizar) FryPotatoes(resto.FryingOilKind, resto.BoiledPotatoes) resto.FriedPotatoes {
	return resto.FriedPotatoes{}
}
