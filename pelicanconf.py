#!/usr/bin/env python3
import datetime
import locale
import logging
import os

import pelican
from markdown.extensions import Extension
from markdown.inlinepatterns import SimpleTagPattern
from pelican.plugins import jinja2content
from pelican.utils import DateFormatter

PELICAN_VERSION = pelican.__version__

AUTHOR = "Maxime Le Conte des Floris"
SITENAME = "blog.mlcdf"
SITEURL = ""

SITESUBTITLE = "Blog personnel de Maxime Le Conte des Floris"
DESCRIPTION = "Le blog de Maxime Le Conte des Floris, développeur web le jour, amateur de photographie et de cinéma la nuit."

PATH = "content"
OUTPUT_PATH = "output/"

TIMEZONE = "Europe/Paris"

locale.setlocale(locale.LC_ALL, 'fr_FR.UTF-8')
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
    (logging.WARN, "CATEGORY_SAVE_AS is set to False"),
    (logging.WARN, "AUTHOR_SAVE_AS is set to False"),
]

DEFAULT_PAGINATION = 20

RELATIVE_URLS = True

ARTICLE_SAVE_AS = "{date:%Y}/{slug}/index.html"
ARTICLE_URL = "{date:%Y}/{slug}"

PAGE_SAVE_AS = "{slug}/index.html"
PAGE_URL = "{slug}"

STATIC_PATHS = ["extra"]

EXTRA_PATH_METADATA = {
    "extra/humans.txt": {"path": "humans.txt"},
    "extra/robots.txt": {"path": "robots.txt"},
    "extra/favicon.svg": {"path": "favicon.svg"},
    "extra/apple-touch-icon.png": {"path": "apple-touch-icon.png"},
    "extra/favicon-192x192.png": {"path": "favicon-192x192.png"},
    "extra/favicon-512x512.png": {"path": "favicon-512x512.png"},
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/manifest.webmanifest": {"path": "manifest.webmanifest"},
}


class StrikeExtension(Extension):
    def extendMarkdown(self, md):
        # Create the del pattern
        del_tag = SimpleTagPattern(r"(~~)(.*?)~~", "del")
        # Insert del pattern into markdown parser
        md.inlinePatterns.add("del", del_tag, ">not_strong")


MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
        "markdown.extensions.toc": {"permalink": "#", "permalink_title": "Lien permanent", "baselevel": 2},
    },
    "extensions": [StrikeExtension()],
    "output_format": "html5",
}

BUILD_DATE = datetime.datetime.now()


def icon(name: str):
    with open(os.path.join(os.getcwd(), "theme", "static", "images", name), "r") as fd:
        return fd.read()


JINJA_FILTERS = {
    "strftime": DateFormatter(),
    "icon": icon
}

JINJA_GLOBALS = {"BUILD_DATE": BUILD_DATE}

PLUGIN_PATHS = ["plugins"]
PLUGINS = ["asset_reving", jinja2content]
THEME_STATIC_PATHS = ["static"]

SOCIAL = [
    ("mailto:contact@mlcdf.fr", "contact@mlcdf.fr"),
    ("https://github.com/mlcdf", "GitHub"),
    ("https://pinboard.in/u:mlcdf", "Pinboard"),
    ("https://toot.cafe/@mlcdf", "Fédiverse"),
    ("https://twitter.com/mlcdf", "Twitter"),
]
