package pubsub

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestRedisBus(t *testing.T) {
	assert := assert.New(t)

	bus, err := NewRedisBus(":6379")
	assert.NoError(err)
	done := make(chan string)

	bus.Subscribe("foo", func(msg string) error {
		done <- msg
		return nil
	})

	err = bus.Publish("foo", "bar")
	assert.NoError(err)

	select {
	case msg := <-done:
		assert.Equal("bar", msg)
	case <-time.After(5 * time.Second):
		t.Fatal("timeout")
	}
}

func TestRedisBusWildcard(t *testing.T) {
	assert := assert.New(t)

	bus, err := NewRedisBus(":6379")
	assert.NoError(err)
	done := make(chan string)

	bus.Subscribe("foo.*", func(msg string) error {
		done <- msg
		return nil
	})

	err = bus.Publish("foo.patate", "bar")
	assert.NoError(err)

	select {
	case msg := <-done:
		assert.Equal("bar", msg)
	case <-time.After(5 * time.Second):
		t.Fatal("timeout")
	}
}
