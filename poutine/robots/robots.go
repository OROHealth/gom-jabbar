package robots

import (
	"net/http"

	"github.com/OROHealth/gom-jabbar/poutine/pubsub"
	"github.com/julienschmidt/httprouter"
)

type PierreRobot interface {
	OrderTaker
	IngredientMixer
	OrderDeliverer
	MessageSender
	MessageListener
}

type OutremonaRobot interface {
	CheesePicker
	CheeseSqueezer
	NoiseEmitter
}

type MontroyashiRobot interface {
	NoiseListener
	LeonardCohenLyricsDisplayer
	DrunkPeopleDetector
}

type VerdunyRobot interface {
	PotatoCutter
	PotatoDipper
}

type NordoRobot interface {
	PotatoBoiler
	LeonardCohenLyricsSinger
}

type BizarRobot interface {
	PotatoFryer
}

type OldoportoRobot interface {
	TemperatureHolder
	GravyDispenser
}

type route struct {
	method  string
	path    string
	handler http.HandlerFunc
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

func (r *Robot) Send(channel, msg string) error {
	return r.bus.Publish(channel, msg)
}

func (r *Robot) Listen(channel string, mh pubsub.MessageHandler) error {
	return r.bus.Subscribe(channel, mh)
}
