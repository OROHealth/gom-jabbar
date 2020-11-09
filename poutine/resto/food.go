package resto

import (
	"fmt"
	"strings"
)

type Ingredient interface {
	Description() string
}

type Poutine []Ingredient

func (p Poutine) String() string {
	var parts []string
	for _, i := range p {
		parts = append(parts, i.Description())
	}
	return fmt.Sprintf("Poutine(\n\t%s\n)", strings.Join(parts, "\n\t"))
}

type CheeseKind string

const (
	CheeseKindCouicCouic CheeseKind = "couic-couic"
	CheeseKindNotSoGood  CheeseKind = "not-so-good"
)

type CheeseCurds struct {
	Kind     CheeseKind `json:"kind,omitempty"`
	Quantity uint       `json:"quantity,omitempty"`
}

type SqueezedCheeseCurds CheeseCurds

func (cc SqueezedCheeseCurds) Description() string {
	return fmt.Sprintf("%d curds of %s cheese", cc.Quantity, cc.Kind)
}

type PotatoKind string

const (
	YellowPotato PotatoKind = "yellow"
	RedPotato    PotatoKind = "red"
	WhitePotato  PotatoKind = "white"
	SweetPotato  PotatoKind = "sweet"
)

type PotatoCutSize string

const (
	SmallCut  PotatoCutSize = "1x1"
	MediumCut PotatoCutSize = "2x2"
	LargeCut  PotatoCutSize = "3x3"
)

type PotatoSoftnessLevel string

const (
	SoftnessRaw     PotatoSoftnessLevel = "raw"
	SoftnessSoftish PotatoSoftnessLevel = "softish"
	SoftnessMushy   PotatoSoftnessLevel = "mushy"
)

type PotatoDipKind string

const (
	MapleSyrupDip PotatoDipKind = "maple-syrup"
)

type Potatoes struct {
	Kind      PotatoKind          `json:"kind,omitempty"`
	Quantity  uint                `json:"quantity,omitempty"`
	CutSize   PotatoCutSize       `json:"cut_size,omitempty"`
	Dip       PotatoDipKind       `json:"dip,omitempty"`
	Softness  PotatoSoftnessLevel `json:"softness,omitempty"`
	FryingOil FryingOilKind       `json:"frying_oil,omitempty"`
}

type CuttedPotatoes Potatoes
type BoiledPotatoes Potatoes
type DippedPotatoes Potatoes
type FriedPotatoes Potatoes

func (fp FriedPotatoes) Description() string {
	return fmt.Sprintf(
		"%d %s potatoes cutted in %s cubes, boilled to %s softness, dipped in %s and fried with %s oil",
		fp.Quantity, fp.Kind, fp.CutSize, fp.Softness, fp.Dip, fp.FryingOil,
	)
}

type FryingOilKind string

const (
	OilKindSunflower FryingOilKind = "sunflower"
	OilKindOlive     FryingOilKind = "olive"
	OilKindValvoline FryingOilKind = "valvoline"
)

type GravyKind string

const (
	GravyKindSecret  GravyKind = "secret"
	GravyKindTequila GravyKind = "tequila"
)

type GravyScoops struct {
	Kind     GravyKind
	Quantity uint
}

func (gs GravyScoops) Description() string {
	return fmt.Sprintf("%d scoops of %s sauce", gs.Quantity, gs.Kind)
}
