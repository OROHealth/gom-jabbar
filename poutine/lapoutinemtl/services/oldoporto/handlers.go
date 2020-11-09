package main

import (
	"github.com/labstack/echo/v4"
	"lapoutinemtl.com/utils"
	"net/http"
)

var saucePoutine utils.SaucePoutine

func getPoutineSauce(c echo.Context) error {
	saucePoutine.IsHotAndFresh = true
	return c.JSON(http.StatusOK, struct {
		utils.SaucePoutine `json:"saucePoutine"`
	}{saucePoutine})
}