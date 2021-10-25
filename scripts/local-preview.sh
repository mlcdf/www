#!/bin/sh
set -eu

$(dirname "$0")/docker.sh publish.sh

xdg-open http://www.mlcdf.local:8080

docker run -p 8080:8080 -v $(pwd)/output:/var/www:ro  --rm syntaqx/serve
