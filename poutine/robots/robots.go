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

func init() {
	rand.Seed(time.Now().UnixNano())
}

type Pierre interface {
	publisherSubscriber
	TakeOrder(*resto.PoutineOrder) (string, error)
	MixIngredients([]resto.Ingredient) (resto.Poutine, error)
	DeliverOrder(id string) error
	Order(id string) (*resto.PoutineOrder, error)
}

type Outremona interface {
	publisherSubscriber
	PickCheese(kind resto.CheeseKind, qty uint) resto.CheeseCurds
	SqueezeCheese(resto.CheeseCurds) resto.SqueezedCheeseCurds
}

type Montroyashi interface {
	publisherSubscriber
	DisplayLeonardCohenLyrics()
	DetectDrunkPeople(*resto.PoutineOrder)
}

type Verduny interface {
	publisherSubscriber
	CutPotatoes(resto.PotatoKind, resto.PotatoCutSize, uint) resto.CuttedPotatoes
	DipPotatoes(resto.CuttedPotatoes, resto.PotatoDipKind, time.Duration) resto.DippedPotatoes
}

type Nordo interface {
	publisherSubscriber
	BoilPotatoes(string, resto.DippedPotatoes, resto.PotatoSoftnessLevel) resto.BoiledPotatoes
	CurrentPotatoesSoftness(string) (resto.PotatoSoftnessLevel, error)
}

type Bizar interface {
	publisherSubscriber
	FryPotatoes(resto.BoiledPotatoes, resto.FryingOilKind) resto.FriedPotatoes
	SingLeonardCohenLyrics(resto.FriedPotatoes, []string) resto.FriedPotatoes
}

type Oldoporto interface {
	publisherSubscriber
	GravyTemperature(resto.GravyKind) (float64, error)
	SetGravyTemperature(resto.GravyKind, float64) error
	DispenseGravy(resto.GravyKind, uint) resto.GravyScoops
}

type publisherSubscriber interface {
	Publish(channel, msg string) error
	Subscribe(channel string, handler pubsub.MessageHandler)
}

type Robot struct {
	bus        pubsub.Bus
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

func (r *Robot) Publish(channel, msg string) error {
	return r.bus.Publish(channel, msg)
}

func (r *Robot) Subscribe(channel string, mh pubsub.MessageHandler) {
	r.bus.Subscribe(channel, mh)
}

func (r *Robot) simulateRandomWork() {
	r.simulateWork(time.Duration(rand.Intn(10)) * time.Second)
}

func (r *Robot) simulateWork(length time.Duration) {
	time.Sleep(length)
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
