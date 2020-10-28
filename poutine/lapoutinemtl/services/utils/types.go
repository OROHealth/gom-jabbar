package utils

// du fromage
type CheddarEnGrains struct {
	IsFresh   bool 	 `json:"isFresh"`
	IsSqueaky bool 	 `json:"isSqueaky"`
	Portion   string `json:"portion"`
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

// l'huile
type Oil interface {
	isCookingOil() bool
	isFresh() bool
}

// sauce poutine
type SaucePoutine struct {
	isHot bool
	isFresh bool
}