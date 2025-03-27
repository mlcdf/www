package main

import (
	"context"
	"flag"
	"fmt"
	"html/template"
	"io"
	"log"
	"log/slog"
	"net/http"
	"os"
	"path"
	"sync"
	"time"

	"github.com/aarol/reload"
)

const usage = ``

func main() {
	ctx := context.Background()
	if err := run(ctx, os.Args, os.Stdout); err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}

type flags struct {
	listenAddr string
	devMode    bool
}

func parseFlags(args []string) (flags, error) {
	flags := flags{}

	flagset := flag.NewFlagSet("www", flag.ExitOnError)
	flagset.StringVar(&flags.listenAddr, "listen-address", "0.0.0.0:8080", "Listen address <host>:<port>")
	flagset.BoolVar(&flags.devMode, "dev", false, "enable development mode (live-reload, HTML errors")

	/*  flagset.Usage = func() {
	    fmt.Println(usage)
	  }*/

	err := flagset.Parse(args[1:])
	return flags, err
}

func run(ctx context.Context, args []string, w io.Writer) error {
	flags, err := parseFlags(args)
	if err != nil {
		return err
	}

	logger := slog.New(slog.NewTextHandler(w, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))

  slog.SetDefault(logger)

	renderer, err := NewRendered("templates/", flags.devMode)
	if err != nil {
		return err
	}

	srv := NewServer(logger, renderer)

	if flags.devMode {
		reloader := reload.New("templates/")
		reloader.OnReload = func() {
			renderer.LoadTemplates()
		}
		reloader.DebugLog = log.Default()
		srv = reloader.Handle(srv)

		slog.Info("livereload enabled")
	}

	httpServer := http.Server{
		Addr:         flags.listenAddr,
		Handler:      srv,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  10 * time.Second,
	}

	slog.Info("HTTP server listening", "url", "http://"+httpServer.Addr)

	err = httpServer.ListenAndServe()
	if err != nil {
		return err
	}

	return nil
}

type Renderer struct {
	template      *template.Template
	templateDir   string
	errorTemplate template.Template
  templateErr error
	once          sync.Once
}

type ParseTemplateErr struct {
	error
}

func NewRendered(directory string, devMode bool) (*Renderer, error) {
	t, err := template.New("error").Parse(`<!DOCTYPE html>
<html>
  <head>
    <title>Template errors</title>
  </head>
  <body>
    <h1>Template error</h1>
    <p>{{ . }}</p>
    </ul>
  </body>
</html>`)

	if err != nil {
		return nil, err
	}

	renderer := &Renderer{errorTemplate: *t, templateDir: directory}

	if !devMode {
		if err := renderer.LoadTemplates(); err != nil {
			return nil, err
		}
	}

	return renderer, nil
}

/*
	t, err := template.ParseGlob(path.Join(directory, "/*.html"))
	if err != nil {
		return nil, fmt.Errorf("failed to parse template, %w", &ParseTemplateErr{error: err})
		/*    template.Must(template.New("").Parse(`
		<!DOCTYPE html>
		<html>
		<head>
		<title>Template errors</title>
		</head>
		<body>

		<h1>Template error</h1>
		<p>{{ .ErrorCode }}</p>
		</ul>

		</body>
		</html>
		      `)).Execute(w, )
    }
		return nil, err
	}

	/t.Funcs(

	)

	return &Renderer{template: *t, templateDir: directory, debug: debug}, nil
*/

func (r *Renderer) LoadTemplates() error {
	r.template, r.templateErr = template.ParseGlob(path.Join(r.templateDir, "/*.html"))

  if r.templateErr != nil {
    slog.Info("failed to load templates")
  } else {
    slog.Info("templates loaded")
  }

	return r.templateErr
}

func (r *Renderer) RenderHTML(name string, w io.Writer) error {
	r.once.Do(func() {
		r.templateErr = r.LoadTemplates()
	})

	if r.templateErr != nil {
		return r.templateErr
	}

	return r.template.ExecuteTemplate(w, name, nil)
}

/* https://pkg.go.dev/html/template#Error */
func (r Renderer) Error(error error, w http.ResponseWriter) {
	err := r.errorTemplate.ExecuteTemplate(w, "error", error)
  if err != nil {
    w.Write([]byte("failed to execute 'error' template"))
  }

  w.WriteHeader(http.StatusInternalServerError)
  fmt.Fprintln(w, err)
}
