package main

import (
	"lapoutinemtl.com/utils"
)

// Pierre is one such robot that is programmed to emulate a talented
// Montréal cook who learned from the great Le Chef Chiffre and can put
// together a true poutine.
// todo: you are writing go code, pierre must return errors too, if any.
type Pierre struct {
	poutine utils.TruePoutine
}

//
func (p *Pierre) TakeSqueakyCheese() utils.TruePoutineProcess {
	p.poutine.CheddarEnGrains = *utils.OneSqueakyCheesePortion()
	return p
}

func (p *Pierre) TakePotatoFries() utils.TruePoutineProcess {
	p.poutine.PotatoFries = *utils.OnePotatoFriesPortion()
	return p
}

func (p *Pierre) TakePoutineSauce() utils.TruePoutineProcess {
	p.poutine.SaucePoutine = *utils.OnePoutineSaucePortion()
	return p
}

func (p *Pierre) CheckQuality() bool {
	if p.poutine.CheddarEnGrains.IsSqueakyAndFresh &&
		p.poutine.SaucePoutine.IsHotAndFresh &&
		p.poutine.PotatoFries.AreHotAndCrispy {
		return true
	} else {
		return false
	}
}

func (p *Pierre) MixTogether() utils.TruePoutine {
	return p.poutine
}
