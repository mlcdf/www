#!/bin/sh
docker build -t pelican .
docker run \
    -p 8000:8000 \
    -v $(pwd)/content:/website/content \
    -v $(pwd)/output:/website/output \
    -v $(pwd)/scripts:/website/scripts \
    -v $(pwd)/theme:/website/theme \
    -v $(pwd)/plugins:/website/plugins \
    -v $(pwd)/pelicanconf.py:/website/pelicanconf.py \
    -v $(pwd)/publishconf.py:/website/publishconf.py \
    --rm \
    -it pelican ./scripts/$@