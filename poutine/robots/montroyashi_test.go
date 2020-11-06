package robots

import (
	"testing"
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
	"github.com/stretchr/testify/assert"
)

func TestMontroyashiSuccess(t *testing.T) {
	assert := assert.New(t)
	done := make(chan bool)
	drunk := false
	lyrics := ""

	bus := &pubsub.Local{}
	bus.Subscribe("drunk-people", func(msg string) error {
		drunk = true
		done <- true
		return nil
	})
	bus.Subscribe("leonard-cohen-lyrics", func(msg string) error {
		lyrics = msg
		done <- true
		return nil
	})

	_ = NewMontroyashi(bus)

	bus.Publish("order-received", toJSON(&resto.PoutineOrder{
		ID:    "test",
		Gravy: resto.GravyKindTequila,
	}))
	bus.Publish("cheese-screams", "AAAAAHHHHH!!!!")

	for i := 0; i < 2; i++ {
		select {
		case <-done:
		case <-time.After(10 * time.Second):
			t.Fatal("timeout")
		}
	}

	assert.True(drunk)
	assert.NotEmpty(lyrics)
}
