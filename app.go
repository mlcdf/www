package main

import (
	"log"
	"net/http"

	"strings"
)

func wrap(h http.Handler) http.Handler {
	return &wrapper{handler: h}
}

type wrapper struct {
	handler http.Handler
}

func (h *wrapper) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path[1:]
	log.Println("Requesting " + path)

	var cacheControl string

	if strings.HasSuffix(path, ".css") || (strings.HasSuffix(path, ".js") && path != "sw.js") {
		cacheControl = "public, max-age=31536000" // 1 year
	} else if path == "sw.js" {
		cacheControl = "no-cache"
	} else if strings.HasSuffix(path, ".svg") || strings.HasSuffix(path, ".png") || strings.HasSuffix(path, ".jpg") {
		cacheControl = "public, max-age=3600" // 1 hour
	} else {
		cacheControl = "public, max-age=600" // 10 minutes
	}

	w.Header().Add("Cache-Control", cacheControl)
	h.handler.ServeHTTP(w, r) // Serve the file
}

func main() {
	http.Handle("/", wrap(http.FileServer(http.Dir("./public"))))
	http.ListenAndServe(":5000", nil)
}
