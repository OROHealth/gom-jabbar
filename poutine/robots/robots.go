package robots

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/OROHealth/gom-jabbar/poutine/resto"
	"github.com/julienschmidt/httprouter"
)

type Pierre interface {
	senderListener
	TakeOrder(*resto.PoutineOrder) (string, error)
	MixIngredients([]resto.Ingredient) (resto.Poutine, error)
	DeliverOrder(id string) error
	Order(id string) (*resto.PoutineOrder, error)
}

type Outremona interface {
	senderListener
	PickCheese(kind resto.CheeseKind, qty uint) resto.CheeseCurds
	SqueezeCheese(resto.CheeseCurds) resto.SqueezedCheeseCurds
}

type Montroyashi interface {
	senderListener
	DisplayLeonardCohenLyrics()
	DetectDrunkPeople(*resto.PoutineOrder)
}

type Verduny interface {
	senderListener
	CutPotatoes(resto.PotatoKind, resto.PotatoCutSize, uint) resto.CuttedPotatoes
	DipPotatoes(resto.CuttedPotatoes) resto.DippedPotatoes
}

type Nordo interface {
	senderListener
	BoilPotatoes(resto.DippedPotatoes) resto.BoiledPotatoes
	SingLeonardCohenLyrics(resto.BoiledPotatoes, string) error
	CurrentPotatoesSoftness(orderID string) (resto.PotatoSoftness, error)
}

type Bizar interface {
	senderListener
	FryPotatoes(resto.FryingOilKind, resto.BoiledPotatoes) resto.FriedPotatoes
}

type Oldoporto interface {
	senderListener
	GravyTemperature(resto.GravyKind) error
	SetTemperature(resto.GravyKind, float64) error
	DispenseGravy(resto.GravyKind, uint) (resto.GravyScoops, error)
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

func (r *Robot) simulateWork() {
	s := rand.Intn(5)
	time.Sleep(time.Duration(s) * time.Second)
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
