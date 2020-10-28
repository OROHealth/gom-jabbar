package utils

import "errors"

//
func (c CheddarEnGrains) squeeze() error {

	if c.IsFresh {
		c.IsSqueaky = true
		return nil
	} else {
		return errors.New("this cheese ain't no fresh like them tim-bits")
	}
}
