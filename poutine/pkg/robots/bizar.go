package robots

import (
	"fmt"
	"math/rand"
	"sync"

	"github.com/dpatrie/gom-jabbar/poutine/pkg/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/pkg/resto"
)

type bizar struct {
	Robot
	Orders sync.Map
	lyrics []string
	mut    sync.Mutex
}

func NewBizar(bus pubsub.Bus) Bizar {
	r := &bizar{
		Robot: Robot{
			bus: bus,
		},
	}

	r.setSubscriptions()
	return r
}

func (r *bizar) setSubscriptions() {
	r.Subscribe("order-received", r.handleOrderReceived)
	r.Subscribe("boiled-potatoes-ready", r.handleBoiledPotatoes)
	r.Subscribe("leonard-cohen-lyrics", r.handleLeonardCohenLyrics)
}

func (r *bizar) handleOrderReceived(msg string) error {
	o := &resto.PoutineOrder{}
	fromJSON(&o, msg)
	r.Orders.Store(o.ID, o)
	return nil
}

func (r *bizar) handleBoiledPotatoes(msg string) error {
	br := resto.BoiledPotatoesReady{}
	fromJSON(&br, msg)

	o, err := r.order(br.OrderID)
	if err != nil {
		return err
	}

	r.Publish("fried-potatoes-start", o.ID)
	fried := r.FryPotatoes(br.BoiledPotatoes, o.Oil)

	var lyrics []string
	qty := rand.Intn(4) + 1

	r.mut.Lock()
	if len(r.lyrics) < qty {
		qty = len(r.lyrics)
	}
	lyrics, r.lyrics = r.lyrics[:qty], r.lyrics[qty:]
	r.mut.Unlock()

	fried = r.SingLeonardCohenLyrics(fried, lyrics)

	return r.Publish("fried-potatoes-ready", toJSON(resto.FriedPotatoesReady{
		OrderID:       o.ID,
		FriedPotatoes: fried,
	}))
}

func (r *bizar) handleLeonardCohenLyrics(msg string) error {
	r.mut.Lock()
	defer r.mut.Unlock()

	var lyrics []string
	fromJSON(&lyrics, msg)
	r.lyrics = append(r.lyrics, lyrics...)
	return nil
}

func (r *bizar) FryPotatoes(boiled resto.BoiledPotatoes, oil resto.FryingOilKind) resto.FriedPotatoes {
	r.simulateRandomWork()
	boiled.FryingOil = oil
	return resto.FriedPotatoes(boiled)
}

func (r *bizar) SingLeonardCohenLyrics(fried resto.FriedPotatoes, lyrics []string) resto.FriedPotatoes {
	for _, l := range lyrics {
		r.bus.Publish("singing-leonard-cohen", l)
	}
	fried.Lyrics = lyrics
	return fried
}

func (r *bizar) order(id string) (o *resto.PoutineOrder, err error) {
	if v, ok := r.Orders.LoadAndDelete(id); !ok {
		err = fmt.Errorf("order not found %s", id)
	} else {
		var ok bool
		if o, ok = v.(*resto.PoutineOrder); !ok {
			err = fmt.Errorf("invalid object stored in order map at id %s", id)
		}
	}
	return
}
