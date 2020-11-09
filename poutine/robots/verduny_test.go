package robots

import (
	"testing"
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
	"github.com/stretchr/testify/assert"
)

func TestVerdunySuccess(t *testing.T) {
	assert := assert.New(t)
	done := make(chan string)

	bus := &pubsub.Local{}
	bus.Subscribe("dipped-potatoes-ready", func(msg string) error {
		done <- msg
		return nil
	})

	r := NewVerduny(bus)
	r.SetDipTime(2 * time.Second) //To make the test run faster

	o := &resto.PoutineOrder{
		ID:        "test",
		Size:      "medium",
		Potato:    resto.RedPotato,
		PotatoCut: resto.MediumCut,
		PotatoDip: resto.MapleSyrupDip,
	}
	bus.Publish("order-received", toJSON(o))

	select {
	case msg := <-done:
		dr := resto.DippedPotatoesReady{}
		fromJSON(&dr, msg)

		assert.Equal(dr.OrderID, o.ID)
		assert.Equal(dr.DippedPotatoes.Kind, o.Potato)
		assert.Equal(dr.DippedPotatoes.Quantity, o.Size.Template().PotatoCount)
		assert.Equal(dr.DippedPotatoes.Dip, o.PotatoDip)

	case <-time.After(30 * time.Second):
		t.Fatal("timeout")
	}

}
