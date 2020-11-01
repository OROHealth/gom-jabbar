package utils

// du fromage
type CheddarEnGrains struct {
	IsSqueakyAndFresh bool `json:"isSqueakyAndFresh"`
}

// la patate
type Potato struct {
	genus string
	isEdible bool
}

// les patates
type Potatoes struct {
	potatoes []Potato
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