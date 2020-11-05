package robots

type OrderTaker interface {
	TakeOrder(PoutineOrder) error
}

type CheesePicker interface {
	PickCheese(CheeseBox, quantity uint) (CheeseCurds, error)
}

type CheeseSqueezer interface {
	SqueezeCheese(CheeseCurds) error
}

type DrunkPeopleDetector interface {
	DetectDrunkPeople() error
}

type LeonardCohenLyricsDisplayer interface {
	DisplayLeonardCohenLyrics() error
}

type PotatoCutter interface {
	CutPotato(PotatoBag, PotatoCutSize) error
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
	EmitNoise() error
}

type NoiseListener interface {
	ListenToNoise() error
}

type TemperatureHolder interface {
	HoldTemperature() error
	SetTemperature(float64) error
}

type GravyDispenser interface {
	DispenseGravy() (GravyScoops, error)
}

type IngredientMixer interface {
	MixIngredients(...Ingredient) (Poutine, error)
}

type OrderDeliverer interface {
	DeliverOrder(PoutineOrder) (Poutine, error)
}

type Ingredient interface {
	Description() string
}
