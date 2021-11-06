#!/bin/sh
set -eu

if [ $# -eq 0 ]
  then
    echo "\e[1;33mNo arguments supplied. Continuing with dev.sh\e[0m"
fi

SCRIPT=${1:-dev.sh}

TAG="github.com/mlcdf/www"

echo "\e[1;34mBuilding Docker image ${TAG}\e[0m"

docker build -t github.com/mlcdf/www .
docker run \
    -p 8000:8000 \
    -v $(pwd)/content:/website/content \
    -v $(pwd)/output:/website/output \
    -v $(pwd)/scripts:/website/scripts \
    -v $(pwd)/theme:/website/theme \
    -v $(pwd)/plugins:/website/plugins \
    -v $(pwd)/pelicanconf.py:/website/pelicanconf.py \
    -v $(pwd)/publishconf.py:/website/publishconf.py \
    -v $(pwd)/key.key:/website/key.key \
    -v $(pwd)/.env:/website/.env \
    --rm \
    -e SITEURL \
    -e GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD) \
    -it github.com/mlcdf/www ./scripts/${SCRIPT}
