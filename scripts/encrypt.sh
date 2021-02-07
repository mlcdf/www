#!/bin/sh
python -m crypto encrypt theme/static/images/leaves.svg --key key.key
python -m crypto encrypt theme/static/images/rss.svg  --key key.key
python -m crypto encrypt theme/static/images/code-website.svg  --key key.key
