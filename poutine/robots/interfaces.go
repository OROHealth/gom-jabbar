package robots

import "github.com/OROHealth/gom-jabbar/poutine/pubsub"

type OrderTaker interface {
	TakeOrder(PoutineOrder) (id string, err error)
}

type CheesePicker interface {
	PickCheese(qty uint) CheeseCurds
}

type CheeseSqueezer interface {
	SqueezeCheese(CheeseCurds) CheeseCurds
}

type DrunkPeopleDetector interface {
	DetectDrunkPeople() error
}

type LeonardCohenLyricsDisplayer interface {
	DisplayLeonardCohenLyrics() error
}

type LeonardCohenLyricsSinger interface {
	SingLeonardCohenLyrics() error
}

type PotatoCutter interface {
	CutPotato(PotatoCutSize) error
}

type PotatoDipper interface {
	DipPotato() error
}

type PotatoBoiler interface {
	BoilPotato() error
	CurrentSoftness() (PotatoSoftness, error)
}

type PotatoFryer interface {
	SetOil(FryingOilKind) error
	FryPotato() error
}

type NoiseEmitter interface {
	EmitNoise(noise string) error
}

type NoiseListener interface {
	ListenToNoise(noiseHandler func(string)) error
}

type TemperatureHolder interface {
	HoldTemperature() error
	SetTemperature(float64) error
}

type GravyDispenser interface {
	DispenseGravy() (GravyScoops, error)
}

type IngredientMixer interface {
	MixIngredients(PoutineOrder) (Poutine, error)
}

type OrderDeliverer interface {
	DeliverOrder(PoutineOrder) (Poutine, error)
}

type Ingredient interface {
	Description() string
}

type HTTPServer interface {
	ListenAndServe(port string) error
}

type MessageSender interface {
	Send(channel, msg string) error
}

type MessageListener interface {
	Listen(channel string, handler pubsub.MessageHandler) error
}
