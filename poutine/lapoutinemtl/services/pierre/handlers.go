package main

import (
	"encoding/json"
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
)

var pierre Pierre

func MixAll(context echo.Context) error {

	pierre.TakeSqueakyCheese().TakePotatoFries().TakePoutineSauce()
	if pierre.CheckQuality() {
		pierre.poutine = pierre.MixTogether()
	}
	poutineJSON, err := json.Marshal(pierre.poutine)

	if err != nil {
		fmt.Println(err)
		return err
	}
	context.Set("poutine", string(poutineJSON))
	return context.JSON(http.StatusOK, pierre.poutine)
}