#!/bin/sh
set -eu

$(dirname "$0")/docker.sh publish.sh

xdg-open http://www.mlcdf.local:8000

docker run -p 8000:8080 -v $(pwd)/output:/var/www:ro  --rm syntaqx/serve
