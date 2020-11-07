package robots

import (
	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
)

type oldoporto struct {
	Robot
}

func NewOldoporto(bus pubsub.PubSub) Oldoporto {
	r := &oldoporto{
		Robot: Robot{
			bus: bus,
		},
	}

	return r
}

func (r *oldoporto) GravyTemperature(k resto.GravyKind) error {
	return nil
}
func (r *oldoporto) SetTemperature(k resto.GravyKind, temperature float64) error {
	return nil
}
func (r *oldoporto) DispenseGravy(k resto.GravyKind, qty uint) (resto.GravyScoops, error) {
	return resto.GravyScoops{}, nil
}
