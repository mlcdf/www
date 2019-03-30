#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import datetime

import pelican

PELICAN_VERSION = pelican.__version__

AUTHOR = "Maxime Le Conte des Floris"
SITENAME = "@mlcdf"
SITEURL = ""

SITESUBTITLE = "Logiciel et sorcellerie"
DESCRIPTION = "Lorem Ipsum"

PATH = "content"

TIMEZONE = "Europe/Paris"

LOCALE = ["fr_FR"]
DEFAULT_LANG = "fr"

THEME = "theme"

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
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/humans.txt": {"path": "humans.txt"},
    "extra/robots.txt": {"path": "robots.txt"},
    "extra/.htaccess": {"path": ".htaccess"},
}

now = datetime.datetime.now()
BUILD_DATE = now.strftime("%d %B %Y")
CURRENT_YEAR = now.year
