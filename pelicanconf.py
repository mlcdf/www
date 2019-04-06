#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import datetime

import pelican

PELICAN_VERSION = pelican.__version__

AUTHOR = "Maxime Le Conte des Floris"
SITENAME = "@mlcdf"
SITEURL = ""

SITESUBTITLE = "Le blog de Maxime"
DESCRIPTION = "Lorem Ipsum"

PATH = "content"

TIMEZONE = "Europe/Paris"

LOCALE = ["fr_FR"]
DEFAULT_LANG = "fr"

THEME = "theme"

AUTHOR_SAVE_AS = False
AUTHORS_SAVE_AS = False
TAG_SAVE_AS = False
TAGS_SAVE_AS = False
CATEGORY_SAVE_AS = False
CATEGORIES_SAVE_AS = False
ARCHIVES_SAVE_AS = False

# Feed generation is usually not desired when developing
FEED_RSS = None
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

DEFAULT_PAGINATION = 20

DISPLAY_PAGES_ON_MENU = True

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

ARTICLE_SAVE_AS = "{date:%Y}/{slug}/index.html"
ARTICLE_URL = "{date:%Y}/{slug}"

PAGE_SAVE_AS = "{slug}/index.html"
PAGE_URL = "{slug}"

STATIC_PATHS = ["extra"]

EXTRA_PATH_METADATA = {
    "extra/humans.txt": {"path": "humans.txt"},
    "extra/robots.txt": {"path": "robots.txt"},
    "extra/.htaccess": {"path": ".htaccess"},
    "extra/android-icon-192x192.png": {"path": "android-icon-192x192.png"},
    "extra/apple-icon-57x57.png": {"path": "apple-icon-57x57.png"},
    "extra/apple-icon-60x60.png": {"path": "apple-icon-60x60.png"},
    "extra/apple-icon-72x72.png": {"path": "apple-icon-72x72.png"},
    "extra/apple-icon-76x76.png": {"path": "apple-icon-76x76.png"},
    "extra/apple-icon-114x114.png": {"path": "apple-icon-114x114.png"},
    "extra/apple-icon-120x120.png": {"path": "apple-icon-120x120.png"},
    "extra/apple-icon-144x144.png": {"path": "apple-icon-144x144.png"},
    "extra/apple-icon-152x152.png": {"path": "apple-icon-152x152.png"},
    "extra/apple-icon-180x180.png": {"path": "apple-icon-180x180.png"},
    "extra/apple-icon": {"path": "apple-icon"},
    "extra/favicon-16x16.png": {"path": "favicon-16x16.png"},
    "extra/favicon-32x32.png": {"path": "favicon-32x32.png"},
    "extra/favicon-96x96.png": {"path": "favicon-96x96.png"},
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/manifest.webmanifest": {"path": "manifest.webmanifest"},
}

now = datetime.datetime.now()
BUILD_DATE = now.strftime("%d %B %Y")
CURRENT_YEAR = now.year

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'markdown.extensions.toc': {
            "permalink": "#"
        },
    },
    'output_format': 'html5',
}


PLUGIN_PATHS=["./plugins"]
PLUGINS=["jinja2content"]
