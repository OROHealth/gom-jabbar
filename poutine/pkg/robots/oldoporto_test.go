package robots

import (
	"testing"
	"time"

	"github.com/dpatrie/gom-jabbar/poutine/pkg/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/pkg/resto"
	"github.com/stretchr/testify/assert"
)

func TestOldoportoSuccess(t *testing.T) {
	assert := assert.New(t)
	done := make(chan bool)

	scoops := resto.GravyScoopsReady{}
	bus := &pubsub.Local{}
	bus.Subscribe("gravy-scoops-ready", func(msg string) error {
		fromJSON(&scoops, msg)
		done <- true
		return nil
	})

	_ = NewOldoporto(bus)
	o := &resto.PoutineOrder{
		ID:    "test",
		Size:  "small",
		Gravy: resto.GravyKindTequila,
	}
	bus.Publish("order-received", toJSON(o))

	select {
	case <-done:
		assert.Equal(scoops.OrderID, o.ID)
		assert.Equal(scoops.Kind, o.Gravy)
		assert.Equal(scoops.Quantity, o.Size.Template().ScoopsCount)
	case <-time.After(20 * time.Second):
		t.Fatal("timeout")
	}
}
