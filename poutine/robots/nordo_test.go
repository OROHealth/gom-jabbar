package robots

import (
	"testing"
	"time"

	"github.com/dpatrie/gom-jabbar/poutine/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/resto"
	"github.com/stretchr/testify/assert"
)

func TestNordoSuccess(t *testing.T) {
	assert := assert.New(t)
	done := make(chan string)

	bus := &pubsub.Local{}
	bus.Subscribe("boiled-potatoes-ready", func(msg string) error {
		done <- msg
		return nil
	})

	r := NewNordo(bus)

	o := &resto.PoutineOrder{
		ID:             "test",
		Size:           "medium",
		Potato:         resto.RedPotato,
		PotatoCut:      resto.MediumCut,
		PotatoDip:      resto.MapleSyrupDip,
		PotatoSoftness: resto.SoftnessSoftish,
	}
	bus.Publish("order-received", toJSON(o))

	time.Sleep(time.Second) //Allow some time for the service to be aware of the order

	bus.Publish("dipped-potatoes-ready", toJSON(resto.DippedPotatoesReady{
		OrderID: o.ID,
		DippedPotatoes: resto.DippedPotatoes(resto.Potatoes{
			Kind:     o.Potato,
			Quantity: o.Size.Template().PotatoCount,
			CutSize:  o.PotatoCut,
			Dip:      o.PotatoDip,
		}),
	}))

	s, _ := r.CurrentPotatoesSoftness(o.ID)
	assert.Equal(s, resto.SoftnessRaw)

	select {
	case msg := <-done:
		br := resto.BoiledPotatoesReady{}
		fromJSON(&br, msg)

		assert.Equal(br.OrderID, o.ID)
		assert.Equal(br.BoiledPotatoes.Kind, o.Potato)
		assert.Equal(br.BoiledPotatoes.Quantity, o.Size.Template().PotatoCount)
		assert.Equal(br.BoiledPotatoes.Dip, o.PotatoDip)
		assert.Equal(br.Softness, o.PotatoSoftness)

		s, _ := r.CurrentPotatoesSoftness(o.ID)
		assert.Equal(s, o.PotatoSoftness)

	case <-time.After(30 * time.Second):
		t.Fatal("timeout")
	}

}
