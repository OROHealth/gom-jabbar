package main

import (
	"github.com/labstack/echo/v4"
	"lapoutinemtl.com/utils"
	"net/http"
)

func mixAll(context echo.Context) error {

	var pierre Pierre
	pierre.TakeSqueakyCheese().TakePotatoFries().TakePoutineSauce()
	if pierre.CheckQuality() {
		pierre.poutine = pierre.MixTogether()
	}

	return context.JSON(http.StatusOK, struct {
		utils.TruePoutine `json:"poutine"`
	}{pierre.poutine})
}