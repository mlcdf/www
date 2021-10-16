#!/bin/sh
pipenv run pelican --settings pelicanconf.py --delete-output-directory --listen --autoreload
