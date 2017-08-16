package main

import (
	"io/ioutil"
	"net/http"

	"strings"
)

type staticHandler struct {
	root           string
	allowedMethods []string
}

func static(root string, allowedMethods []string) http.Handler {
	return &staticHandler{root, allowedMethods}
}

func (handler *staticHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path[1:]

	isAllowed := false
	for _, allowedMethod := range handler.allowedMethods {
		if allowedMethod != r.Method {
			isAllowed = true
			break
		}
	}

	if isAllowed == false {
		w.WriteHeader(405)
		w.Write([]byte("404 My dear - " + http.StatusText(404)))
		return
	}

	data, err := ioutil.ReadFile(handler.root + string(path))

	isIndexHTML := false

	if err != nil {
		data, err = ioutil.ReadFile(handler.root + string(path) + "/index.html")
		isIndexHTML = true
	}

	if err == nil {
		var contentType string
		var cacheControl string

		if strings.HasSuffix(path, ".css") {
			contentType = "text/css; charset=utf-8"
			cacheControl = "public, max-age=31536000"
		} else if strings.HasSuffix(path, ".html") || isIndexHTML {
			contentType = "text/html; charset=utf-8"
			cacheControl = "no-cache"
		} else if strings.HasSuffix(path, ".js") {
			contentType = "application/javascript; charset=utf-8"
			if path == handler.root+"/sw.js" {
				cacheControl = "no-cache"
			} else {
				cacheControl = "public, max-age=31536000"
			}
		} else if strings.HasSuffix(path, ".png") {
			contentType = "image/png"
		} else if strings.HasSuffix(path, ".svg") {
			contentType = "image/svg+xml"
		} else {
			contentType = "text/plain; charset=utf-8"
		}

		if path == handler.root+"/sw.js" {
			cacheControl = "no-cache"
		}

		w.Header().Add("Cache-Control", cacheControl)
		w.Header().Add("Content-Type", contentType)
		w.Write(data)
	} else {
		w.WriteHeader(404)
		w.Write([]byte("404 My dear - " + http.StatusText(404)))
	}
}

func main() {
	http.Handle("/", static("./public/", []string{"GET", "HEAD"}))
	http.ListenAndServe(":5000", nil)
}
