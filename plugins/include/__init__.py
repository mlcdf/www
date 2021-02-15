"""Include file content inside the html page. Mostly used to include svg icons.
Support encrypted assets.
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
