package robots

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
)

type nordo struct {
	Robot
	Orders          sync.Map
	CurrentSoftness sync.Map
}

func NewNordo(bus pubsub.Bus) Nordo {
	r := &nordo{
		Robot: Robot{
			bus: bus,
		},
	}

	r.setHTTPHandlers()
	r.setSubscriptions()
	return r
}

func (r *nordo) setHTTPHandlers() {
	r.httpRoutes = []route{
		{method: "GET", path: "/orders/:id", handler: r.httpOrderSoftness},
	}
}

func (r *nordo) setSubscriptions() {
	r.Subscribe("order-received", r.handleOrderReceived)
	r.Subscribe("dipped-potatoes-ready", r.handleDippedPotatoes)
}

func (r *nordo) handleOrderReceived(msg string) error {
	o := &resto.PoutineOrder{}
	fromJSON(&o, msg)
	r.Orders.Store(o.ID, o)
	r.CurrentSoftness.Store(o.ID, resto.SoftnessRaw)
	return nil
}

func (r *nordo) handleDippedPotatoes(msg string) error {
	dr := resto.DippedPotatoesReady{}
	fromJSON(&dr, msg)

	o, err := r.order(dr.OrderID)
	if err != nil {
		return err
	}

	r.Publish("boiled-potatoes-start", o.ID)
	return r.Publish("boiled-potatoes-ready", toJSON(resto.BoiledPotatoesReady{
		OrderID:        o.ID,
		BoiledPotatoes: r.BoilPotatoes(o.ID, dr.DippedPotatoes, o.PotatoSoftness),
	}))
}

func (r *nordo) BoilPotatoes(orderID string, dipped resto.DippedPotatoes, level resto.PotatoSoftnessLevel) resto.BoiledPotatoes {
	r.simulateRandomWork()
	r.CurrentSoftness.Store(orderID, level)
	time.AfterFunc(10*time.Minute, func() {
		r.CurrentSoftness.Delete(orderID) //Cleanup the softness after a while...
	})
	dipped.Softness = level
	return resto.BoiledPotatoes(dipped)
}

func (r *nordo) CurrentPotatoesSoftness(orderID string) (resto.PotatoSoftnessLevel, error) {
	v, ok := r.CurrentSoftness.Load(orderID)
	if !ok {
		return "", fmt.Errorf("unknown order %s", orderID)
	}
	return v.(resto.PotatoSoftnessLevel), nil
}

func (r *nordo) order(id string) (o *resto.PoutineOrder, err error) {
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

func (r *nordo) httpOrderSoftness(w http.ResponseWriter, req *http.Request) {
	o, err := r.CurrentPotatoesSoftness(r.urlParam(req, "id"))
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(o)
}
