package main

import (
	"log/slog"
	"net/http"
)

func NewServer(logger *slog.Logger, renderer *Renderer) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/", index(renderer))

	var handler http.Handler = mux
	handler = logging(handler, logger)

	return handler
}

// Logging is a very simple logging middleware
func logging(h http.Handler, logger *slog.Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logger.InfoContext(r.Context(), r.RemoteAddr+" "+r.Method+" "+r.URL.Path+" "+r.Proto+"\"")
		h.ServeHTTP(w, r)
	})
}

func index(renderer *Renderer) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		err := renderer.RenderHTML("index.html", w)
		if err != nil {
			renderer.Error(err, w)
		}
	}
}
