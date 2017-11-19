package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"

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

type server struct {
	Router *mux.Router
}

// ServeHTTP add a proper cache-control header
func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path[1:]
	// log.Println("Requesting /" + path)
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
	s.Router.ServeHTTP(w, r) // Serve the file
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
	port := "3000"
	debug := true

	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	}

	if os.Getenv("DEBUG") != "" {
		debug, _ = strconv.ParseBool(os.Getenv("DEBUG"))
	}

	locales := LoadLocales()

	r := render.New(render.Options{
		Directory:  "pages",
		Layout:     "layout",
		Extensions: []string{".html"},
		Funcs: []template.FuncMap{
			{
				"revving": revving,
			},
		},
		IsDevelopment: debug,
	})

	router := mux.NewRouter()

	// Handles static files
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

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

	srv := &http.Server{
		Handler: handlers.LoggingHandler(os.Stdout, handlers.CompressHandler(router)),
		Addr:    "127.0.0.1:" + port,
		// Good practice: enforce timeouts for servers
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}
