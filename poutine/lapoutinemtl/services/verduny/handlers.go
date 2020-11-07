package main

import (
	"github.com/labstack/echo/v4"
	"lapoutinemtl.com/utils"
	"net/http"
)

var Potatoes utils.Potatoes

// cuts potatoes with provided size
// for example: /verduny/potatoes/cut?size=3
// default size is 1
func cutPotatoes(c echo.Context) error {

	qp := c.QueryParams()
	cutSize := qp.Get("size")
	if cutSize == "" {
		cutSize = "1"
	}
	Potatoes = utils.OnePortionCutPotatoes(cutSize)
	return c.JSON(http.StatusAccepted, struct {
		utils.Potatoes `json:"cutPotatoes"`
	}{Potatoes})
}

func dipInMapleSyrup(c echo.Context) error {
	if Potatoes.Portion != "" {
		Potatoes.DippedIn = "maple syrup"
		return c.JSON(http.StatusAccepted, struct {
			utils.Potatoes `json:"cutPotatoes"`
		}{Potatoes})
	} else {
		return c.JSON(http.StatusBadRequest, struct {
			Message string `json:"message"`
		}{"cut those damn potatoes man, only then you can dip them into the syrup!"})
	}
}

func getPotatoes(c echo.Context) error {
	if Potatoes.Portion != "" {
		return c.JSON(http.StatusOK, struct {
			utils.Potatoes `json:"cutPotatoes"`
		}{Potatoes})
	} else {
		return c.JSON(http.StatusBadRequest, struct {
			Message string `json:"message"`
		}{"I don't have yet what you're looking for!"})
	}
}