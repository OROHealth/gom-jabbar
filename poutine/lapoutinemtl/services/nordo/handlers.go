package main

import (
	"encoding/json"
	"fmt"
	"github.com/labstack/echo/v4"
	"io/ioutil"
	"lapoutinemtl.com/utils"
	"net/http"
)

type Potatoes struct {
	utils.Potatoes `json:"cutPotatoes"`
}

func boil(c echo.Context) error {

	tr := &http.Transport{}
	client := &http.Client{Transport: tr}

	// Call the api
	resp, err := client.Get("http://host.docker.internal:5143/verduny/potatoes/get")
	if err != nil {
		fmt.Errorf("err is: %s", err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	var potatoes Potatoes
	err = json.Unmarshal(body, &potatoes)
	if err != nil {}

	if potatoes.Portion != "" {
		// cook potatoes
		potatoes.AreCooked = true
		return c.JSON(http.StatusOK, potatoes)
	} else {
		return c.JSON(http.StatusBadRequest, struct {
			Message string `json:"message"`
		}{"nothing to cook yet!"})
	}
}

