package robots

import (
	"encoding/json"
	"net/http"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
	"github.com/julienschmidt/httprouter"
)

type Pierre interface {
	senderListener
	TakeOrder(*resto.PoutineOrder) (string, error)
	MixIngredients(i []resto.Ingredient) (resto.Poutine, error)
	DeliverOrder(id string) error
	Order(id string) (*resto.PoutineOrder, error)
}

type Outremona interface {
	senderListener
	PickCheese(qty uint) resto.CheeseCurds
	SqueezeCheese(resto.CheeseCurds) resto.CheeseCurds
	EmitNoise()
}

type Montroyashi interface {
	senderListener
	ListenNoise()
	DisplayLeonardCohenLyrics() error
	DetectDrunkPeople() error
}

type Verduny interface {
	senderListener
	CutPotato(resto.PotatoCutSize) error
	DipPotato() error
}

type Nordo interface {
	senderListener
	BoilPotato() error
	CurrentPotatoesSoftness() (resto.PotatoSoftness, error)
	SingLeonardCohenLyrics() error
}

type Bizar interface {
	senderListener
	SetOil(resto.FryingOilKind) error
	FryPotato() error
}

type Oldoporto interface {
	senderListener
	HoldTemperature() error
	SetTemperature(float64) error
	DispenseGravy() (resto.GravyScoops, error)
}

type senderListener interface {
	Send(channel, msg string) error
	Listen(channel string, handler pubsub.MessageHandler) error
}

type Robot struct {
	bus        pubsub.PubSub
	httpRoutes []route
}

func (r *Robot) ServeHTTP(port string) error {
	router := httprouter.New()
	for _, r := range r.httpRoutes {
		router.HandlerFunc(r.method, r.path, r.handler)
	}
	return http.ListenAndServe(":"+port, router)
}

func (r *Robot) urlParam(req *http.Request, key string) string {
	params := httprouter.ParamsFromContext(req.Context())
	return params.ByName(key)
}

func (r *Robot) Send(channel, msg string) error {
	return r.bus.Publish(channel, msg)
}

func (r *Robot) Listen(channel string, mh pubsub.MessageHandler) error {
	return r.bus.Subscribe(channel, mh)
}

type route struct {
	method  string
	path    string
	handler http.HandlerFunc
}

func toJSON(i interface{}) string {
	b, _ := json.Marshal(i)
	return string(b)
}

func fromJSON(dst interface{}, val string) error {
	return json.Unmarshal([]byte(val), dst)
}
