#!/bin/sh
python -m crypto decrypt theme/static/images/leaves.svg
python -m crypto decrypt theme/static/images/rss.svg
python -m crypto decrypt theme/static/images/code-website.svg
pelican --delete-output-directory --settings publishconf.py
