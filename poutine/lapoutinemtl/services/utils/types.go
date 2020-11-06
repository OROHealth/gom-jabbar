package utils

// du fromage
type CheddarEnGrains struct {
	IsSqueakyAndFresh bool `json:"isSqueakyAndFresh"`
}

// la patate
type Potatoes struct {
	CutSize 	string `json:"cutSize"`
	Portion 	string `json:"portion"`
	DippedIn	string `json:"dippedIn"`
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