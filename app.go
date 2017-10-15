package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"strings"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

type server struct {
	router *mux.Router
}

// ServeHTTP add a proper cache-control header
func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path[1:]
	log.Println("Requesting /" + path)
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
	s.router.ServeHTTP(w, r) // Serve the file
}

// revving handles assets revving
func revving(path string) string {
	if os.Getenv("ENV") == "prod" {
		file, err := ioutil.ReadFile("./static/assets/rev.json")

		if err != nil {
			fmt.Println("Failed to read rev file.")
		}

		var m map[string]string
		err = json.Unmarshal(file, &m)

		if err != nil {
			fmt.Println("Failed to unmarshal rev file.")
		}
		rev, found := m[path]

		if found == true {
			return rev
		}
	}
	return path
}

func main() {
	locales := LoadLocales()
	log.Println(locales)

	r := render.New(render.Options{
		Directory:  "pages",
		Layout:     "layout",
		Extensions: []string{".html"},
		Funcs: []template.FuncMap{
			{
				"revving": revving,
			},
		},
	})

	router := mux.NewRouter()

	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

	router.StrictSlash(true)

	router.HandleFunc("/favicon.ico", func(w http.ResponseWriter, req *http.Request) {
		http.ServeFile(w, req, "./static/favicon.ico")
	})

	router.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		r.HTML(w, http.StatusOK, "index", locales.Fr)
	})

	router.HandleFunc("/{page}", func(w http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		r.HTML(w, http.StatusOK, vars["page"], locales.Fr)
	})

	http.Handle("/", &server{router})
	http.ListenAndServe(":3000", nil)
}
