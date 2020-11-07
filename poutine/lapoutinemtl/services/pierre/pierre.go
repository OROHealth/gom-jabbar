package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"lapoutinemtl.com/utils"
	"net/http"
)

// Pierre is one such robot that is programmed to emulate a talented
// Montréal cook who learned from the great Le Chef Chiffre and can put
// together a true poutine.
// todo: you are writing go code, pierre must return errors too, if any.
type Pierre struct {
	poutine utils.TruePoutine
}

type Cheese struct {
	utils.CheddarEnGrains `json:"squeakyCheese"`
}

type Fries struct {
	utils.PotatoFries `json:"potatoFries"`
}

//
func (p *Pierre) TakeSqueakyCheese() utils.TruePoutineProcess {

	tr := &http.Transport{}
	client := &http.Client{Transport: tr}

	// get squeaky cheese
	resp, err := client.Get("http://host.docker.internal:5141/outremona/cheese")
	if err != nil {
		fmt.Errorf("err is: %s", err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	var cheese Cheese
	err = json.Unmarshal(body, &cheese)
	if err != nil {}

	p.poutine.CheddarEnGrains = cheese.CheddarEnGrains
	return p
}

func (p *Pierre) TakePotatoFries() utils.TruePoutineProcess {

	tr := &http.Transport{}
	client := &http.Client{Transport: tr}

	// get potato fries
	resp, err := client.Get("http://host.docker.internal:5145/bizar/potatoes/fries")
	if err != nil {
		fmt.Errorf("err is: %s", err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	var fries Fries
	err = json.Unmarshal(body, &fries)
	if err != nil {}

	p.poutine.PotatoFries = fries.PotatoFries
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
