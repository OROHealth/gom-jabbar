package robots

import (
	"testing"
	"time"

	"github.com/dpatrie/gom-jabbar/poutine/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/resto"
	"github.com/stretchr/testify/assert"
)

func TestBizarSuccess(t *testing.T) {
	assert := assert.New(t)
	done := make(chan string)

	bus := &pubsub.Local{}
	bus.Subscribe("fried-potatoes-ready", func(msg string) error {
		done <- msg
		return nil
	})

	_ = NewBizar(bus)

	o := &resto.PoutineOrder{
		ID:             "test",
		Size:           "medium",
		Potato:         resto.RedPotato,
		PotatoCut:      resto.MediumCut,
		PotatoDip:      resto.MapleSyrupDip,
		PotatoSoftness: resto.SoftnessSoftish,
		Oil:            resto.OilKindValvoline,
	}
	bus.Publish("order-received", toJSON(o))
	bus.Publish("leonard-cohen-lyrics", toJSON(leonardCohenLyrics[0:10]))

	time.Sleep(time.Second) //Allow some time for the service to be aware of the order

	bus.Publish("boiled-potatoes-ready", toJSON(resto.BoiledPotatoesReady{
		OrderID: o.ID,
		BoiledPotatoes: resto.BoiledPotatoes(resto.Potatoes{
			Kind:     o.Potato,
			Quantity: o.Size.Template().PotatoCount,
			CutSize:  o.PotatoCut,
			Dip:      o.PotatoDip,
			Softness: o.PotatoSoftness,
		}),
	}))

	select {
	case msg := <-done:
		fr := resto.FriedPotatoesReady{}
		fromJSON(&fr, msg)

		assert.Equal(fr.OrderID, o.ID)
		assert.Equal(fr.FryingOil, o.Oil)
		assert.NotEmpty(fr.Lyrics)

	case <-time.After(30 * time.Second):
		t.Fatal("timeout")
	}

}
