package utils

// du fromage
type CheddarEnGrains struct {
	IsSqueakyAndFresh bool `json:"isSqueakyAndFresh"`
}

type CutPotatoes struct {
	Potatoes `json:"cutPotatoes"`
}

// la patate
type Potatoes struct {
	CutSize 	string `json:"cutSize"`
	Portion 	string `json:"portion"`
	DippedIn	string `json:"dippedIn"`
	AreCooked	bool   `json:"areCooked"`
}

// potato fries
type PotatoFries struct {
	AreHotAndCrispy bool `json:"areHotAndCrispy"`
}

// l'huile
type Oil interface {
	isCookingOil() bool
	isFresh() bool
}

// sauce poutine
type SaucePoutine struct {
	IsHotAndFresh bool `json:"isHotAndFresh"`
}