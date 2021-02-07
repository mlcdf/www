#!/bin/sh
python -m crypto decrypt theme/static/images/leaves.svg --key key.key
python -m crypto decrypt theme/static/images/rss.svg --key key.key
python -m crypto decrypt theme/static/images/code-website.svg --key key.key
pelican --settings pelicanconf.py  --listen --autoreload
