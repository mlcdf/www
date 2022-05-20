#!/usr/bin/env python3
import datetime
import locale
import logging

import pelican
from pelican.plugins import jinja2content
from pelican.utils import DateFormatter

PELICAN_VERSION = pelican.__version__

PORT = 8000
BIND = "127.0.0.1"

AUTHOR = "Maxime"
SITENAME = "www.mlcdf.fr"
SITEURL = f"http://{BIND}:{PORT}"

DESCRIPTION = "Artisan logiciel polyglotte et ingénieur DevOps le jour. Photographe en herbe et mordu de cinéma la nuit."

PATH = "content"
OUTPUT_PATH = "output/"

TIMEZONE = "Europe/Paris"

locale.setlocale(locale.LC_ALL, "fr_FR.UTF-8")
LOCALE = ["fr_FR.UTF-8"]
DEFAULT_LANG = "fr"

THEME = "theme"
THEME_STATIC_DIR = "theme"

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

LOG_FILTER = [
    (logging.WARN, "TAG_SAVE_AS is set to False"),
    (logging.WARN, "CATEGORY_SAVE_AS is set to False"),
    (logging.WARN, "AUTHOR_SAVE_AS is set to False"),
]

DEFAULT_PAGINATION = 20

RELATIVE_URLS = True

ARTICLE_SAVE_AS = "blog/{date:%Y}/{slug}/index.html"
ARTICLE_URL = "blog/{date:%Y}/{slug}"

PAGE_SAVE_AS = "{slug}/index.html"
PAGE_URL = "{slug}"

INDEX_SAVE_AS = "index.html"

STATIC_PATHS = ["extra"]

EXTRA_PATH_METADATA = {
    "extra/": {"path": "."},
}

IGNORE_FILES = [
    "theme/static/images/leaves.svg",
    "theme/static/images/code-websites.svg",
    "theme/static/images/rss.svg",
]

MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
    },
    "extensions": [],
    "output_format": "html5",
}

BUILD_DATE = datetime.datetime.now()

JINJA_FILTERS = {
    "strftime": DateFormatter(),
}

JINJA_GLOBALS = {"BUILD_DATE": BUILD_DATE}

PLUGIN_PATHS = ["plugins"]
PLUGINS = ["asset_reving", "strike", "styled_rss", jinja2content]
THEME_STATIC_PATHS = ["static"]

CACHE_CONTENT = True
LOAD_CONTENT_CACHE = True

STYLED_RSS_STYLE_LOCATION = "/theme/pretty-feed-v3.xsl"

WEBRING_FEED_URLS = ["https://adactio.com/articles/rss"]
