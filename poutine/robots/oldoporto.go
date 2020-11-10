package robots

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"sync"

	"github.com/dpatrie/gom-jabbar/poutine/pubsub"
	"github.com/dpatrie/gom-jabbar/poutine/resto"
)

type oldoporto struct {
	Robot
	GravyPots sync.Map
}

func NewOldoporto(bus pubsub.Bus) Oldoporto {
	r := &oldoporto{
		Robot: Robot{
			bus: bus,
		},
	}

	r.GravyPots.Store(resto.GravyKindSecret, 99)
	r.GravyPots.Store(resto.GravyKindTequila, 95)

	r.setHTTPHandlers()
	r.setSubscriptions()
	return r
}

func (r *oldoporto) setHTTPHandlers() {
	r.httpRoutes = []route{
		{method: "GET", path: "/gravies/:kind/temperature", handler: r.httpGravyTemperature},
		{method: "POST", path: "/gravies/:kind/temperature/:temperature", handler: r.httpSetGravyTemperature},
	}
}

func (r *oldoporto) setSubscriptions() {
	r.Subscribe("order-received", r.handleOrderReceived)
}

func (r *oldoporto) handleOrderReceived(msg string) error {
	o := &resto.PoutineOrder{}
	fromJSON(&o, msg)
	r.bus.Publish("gravy-scoops-ready", toJSON(resto.GravyScoopsReady{
		OrderID:     o.ID,
		GravyScoops: r.DispenseGravy(o.Gravy, o.Size.Template().ScoopsCount),
	}))
	return nil
}

func (r *oldoporto) DispenseGravy(k resto.GravyKind, qty uint) resto.GravyScoops {
	r.simulateRandomWork()
	return resto.GravyScoops{
		Kind:     k,
		Quantity: qty,
	}
}

func (r *oldoporto) GravyTemperature(k resto.GravyKind) (float64, error) {
	t, ok := r.GravyPots.Load(k)
	if !ok {
		return 0, fmt.Errorf("unknown gravy kind %s", k)
	}
	return t.(float64), nil
}
func (r *oldoporto) SetGravyTemperature(k resto.GravyKind, temperature float64) error {
	if _, ok := r.GravyPots.Load(k); !ok {
		return fmt.Errorf("unknown gravy kind %s", k)
	}
	r.GravyPots.Store(k, temperature)
	return nil
}

func (r *oldoporto) httpGravyTemperature(w http.ResponseWriter, req *http.Request) {
	o, err := r.GravyTemperature(resto.GravyKind(r.urlParam(req, "kind")))
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(o)
}

func (r *oldoporto) httpSetGravyTemperature(w http.ResponseWriter, req *http.Request) {
	t := r.urlParam(req, "temperature")
	temp, err := strconv.ParseFloat(t, 64)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	if err = r.SetGravyTemperature(resto.GravyKind(r.urlParam(req, "kind")), temp); err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
}
