package robots

import (
	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
)

type nordo struct {
	Robot
}

func NewNordo(bus pubsub.PubSub) Nordo {
	r := &nordo{
		Robot: Robot{
			bus: bus,
		},
	}

	return r
}

func (r *nordo) BoilPotatoes(dp resto.DippedPotatoes) resto.BoiledPotatoes {
	return resto.BoiledPotatoes{}
}
func (r *nordo) SingLeonardCohenLyrics(bp resto.BoiledPotatoes, lyrics string) error {
	return nil
}
func (r *nordo) CurrentPotatoesSoftness(orderID string) (resto.PotatoSoftness, error) {
	return resto.SoftnessRaw, nil
}
