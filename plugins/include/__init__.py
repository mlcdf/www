"""Static asset revisioning by appending content hash to filenames style.css → style-d41d8cd98f.css

1. Set ASSET_REV_ENABLE = True in your publishconf.py to enable this plugin.
2. Use the 'asset_rev' jinja2 globals like this:
    <link rel="stylesheet" href="{{ SITEURL }}/{{ THEME_STATIC_DIR }}/{{ asset_rev('css/style.css') }}" />
"""
import logging
import os

from pelican import signals

from . import crypto

logger = logging.getLogger(__name__)


def include(path: str) -> str:
    with open(path, "r") as fd:
        return crypto.decrypt(fd)


def icon(name: str) -> str:
    return include(os.path.join(os.getcwd(), "theme", "static", "images", name))


def initialize(pelican):
    """Add Webassets to Jinja2 extensions in Pelican settings."""
    pelican.settings["JINJA_FILTERS"]["include"] = include
    pelican.settings["JINJA_FILTERS"]["icon"] = icon


def register():
    signals.initialized.connect(initialize)
