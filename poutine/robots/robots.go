package robots

type Pierre interface {
	OrderTaker
	IngredientMixer
	OrderDeliverer
}

type Outremona interface {
	CheesePicker
	CheeseSqueezer
	NoiseEmitter
}

type Montroyashi interface {
	NoiseListener
	LeonardCohenLyricsDisplayer
	DrunkPeopleDetector
}

type Verduny interface {
	PotatoCutter
	PotatoDipper
}

type Nordo interface {
	PotatoBoiler
}

type Bizar interface {
	PotatoFryer
}

type Oldoporto interface {
	TemperatureHolder
	GravyDispenser
}
