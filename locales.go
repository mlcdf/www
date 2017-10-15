package main

import (
	"fmt"
	"io/ioutil"

	"github.com/pelletier/go-toml"
)

// Labels represents all the labels
type Labels struct {
	Title       string
	Description string
}

// Locales represents all the labels
type Locales struct {
	Fr Labels
	En Labels
}

// LoadLocales load the locales from ./locales.toml
func LoadLocales() Locales {
	var file []byte
	file, err := ioutil.ReadFile("./locales.toml")

	if err != nil {
		fmt.Println("Failed to load locales file.")
	}

	locales := Locales{}
	toml.Unmarshal(file, &locales)
	return locales
}
