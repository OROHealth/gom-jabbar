package main

import (
	"github.com/labstack/echo/v4"
	"lapoutinemtl.com/utils"
	"net/http"
)

var Potatoes utils.Potatoes

func cutPotatoes(c echo.Context) error {
	Potatoes = utils.OnePortionCutPotatoes("1")
	return c.JSON(http.StatusAccepted, struct {
		utils.Potatoes `json:"cutPotatoes"`
	}{Potatoes})
}

func dipInMapleSyrup(c echo.Context) error {
	Potatoes.DippedIn = "maple syrup"
	return c.JSON(http.StatusAccepted, struct {
		utils.Potatoes `json:"cutPotatoes"`
	}{Potatoes})
}

