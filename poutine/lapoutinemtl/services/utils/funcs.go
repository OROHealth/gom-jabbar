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


//
func (c *CheddarEnGrains) Squeeze() error {
	if c != nil {
		c.IsSqueakyAndFresh = true
		return nil
	} else {
		return errors.New("c is nil")
	}
}
