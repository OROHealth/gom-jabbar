package utils

// using builder pattern

// a quality Montréal true poutine
type TruePoutine struct {
	CheddarEnGrains `json:"squeakyCheese"`
	SaucePoutine `json:"saucePoutine"`
	PotatoFries `json:"potatoFries"`
}

// process for making a true poutine
type TruePoutineProcess interface {
	TakeSqueakyCheese() TruePoutineProcess
	TakePotatoFries() TruePoutineProcess
	TakePoutineSauce() TruePoutineProcess
	CheckQuality() bool
	MixTogether() TruePoutine
}

// Le Chef Chiffre
type LeChef struct {
	uses TruePoutineProcess
}

func (c *LeChef) SetPoutineMakingProcess(p TruePoutineProcess)  {
	c.uses = p
}

func (c *LeChef) MakeJuicyPoutine() {
	c.uses.TakeSqueakyCheese().TakePotatoFries().TakePoutineSauce()
}