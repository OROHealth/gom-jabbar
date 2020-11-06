package utils

import "errors"

func OneSqueakyCheesePortion() *CheddarEnGrains {
	poutineCheese := &CheddarEnGrains{IsSqueakyAndFresh: false}
	return poutineCheese
}

func OnePotatoFriesPortion() *PotatoFries {
	fries := &PotatoFries{AreHotAndCrispy: false}
	return fries
}

func OnePoutineSaucePortion() *SaucePoutine {
	sauce := &SaucePoutine{IsHotAndFresh: false}
	return sauce
}


func OnePortionCutPotatoes(cutSize string) Potatoes {

	var potatoes Potatoes

	potatoes.CutSize = cutSize
	potatoes.Portion = "400gms"

	return potatoes
}


//
func (c *CheddarEnGrains) Squeeze() error {
	if c != nil {
		c.IsSqueakyAndFresh = true
		return nil
	} else {
		return errors.New("c is nil")
	}
}
