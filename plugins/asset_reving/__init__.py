"""Static asset revisioning by appending content hash to filenames style.css → style-d41d8cd98f.css

1. Set ASSET_REV_ENABLE = True in your publishconf.py to enable this plugin.
2. Use the 'asset_rev' jinja2 globals like this:
    <link rel="stylesheet" href="{{ SITEURL }}/{{ THEME_STATIC_DIR }}/{{ asset_rev('css/style.css') }}" />
"""
import hashlib
import logging
import os
import pprint
import shutil

from pelican import signals
from pelican.generators import Generator
from pelican.settings import DEFAULT_CONFIG

logger = logging.getLogger(__name__)


def rev_hash(txt: str) -> str:
    return hashlib.md5(txt.encode("utf-8")).hexdigest()[0:10]


def asset_rev(name: str, settings) -> str:
    source_path = os.path.join(
        os.getcwd(), settings["THEME"], settings["THEME_STATIC_PATHS"][0], name
    )
    extension = os.path.splitext(os.path.basename(name))[1]

    with open(source_path, "r") as fd:
        content = fd.read()
    hash_rev = rev_hash(content)

    dest_path = os.path.join(
        os.getcwd(),
        settings["OUTPUT_PATH"],
        settings["THEME_STATIC_DIR"],
        name.replace(extension, "-" + hash_rev + extension),
    )

    settings["ASSET_REV_TO_WATCH"][source_path] = dest_path

    return name.replace(extension, "-" + hash_rev + extension)


def initialize(pelican):
    """Add Webassets to Jinja2 extensions in Pelican settings."""
    DEFAULT_CONFIG["ASSET_REV_ENABLE"] = False

    if "ASSET_REV_ENABLE" in pelican.settings and pelican.settings["ASSET_REV_ENABLE"]:
        pelican.settings["JINJA_GLOBALS"]["asset_rev"] = lambda name: asset_rev(
            name, pelican.settings
        )
        pelican.settings["ASSET_REV_TO_WATCH"] = {}
    else:
        # Do nothing
        pelican.settings["JINJA_GLOBALS"]["asset_rev"] = lambda name: name


class AssetRevGenerator(Generator):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        logger.info(
            "Asset Rev is %s",
            "enabled" if self.settings["ASSET_REV_ENABLE"] else "disabled",
        )

    def generate_output(self, writer):
        if not self.settings["ASSET_REV_ENABLE"]:
            return

        for source_path, dest_path in self.settings["ASSET_REV_TO_WATCH"].items():
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            shutil.copy(source_path, dest_path)
            print("dest_path %s" % dest_path)
            logger.info("Copying %s " % dest_path)


def get_generators(pelican):
    return AssetRevGenerator


def update_ignore_files(pelican, writer):
    if pelican.settings["ASSET_REV_ENABLE"]:
        files_to_ignore = [
            os.path.basename(f)
            for f in list(pelican.settings["ASSET_REV_TO_WATCH"].keys())
        ]
        pelican.settings["IGNORE_FILES"] = (
            pelican.settings["IGNORE_FILES"] + files_to_ignore
        )


def register():
    """Uses the new style of registration based on GitHub Pelican issue #314."""
    signals.initialized.connect(initialize)
    try:
        signals.page_writer_finalized.connect(update_ignore_files)
        signals.get_generators.connect(get_generators)
    except Exception as e:
        logger.exception("Plugin failed to execute: {}".format(pprint.pformat(e)))
