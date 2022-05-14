import os
import xml.etree.ElementTree as ET
import logging

from pelican import signals

logger = logging.getLogger(__name__)


def style_rss(infile: str, outfile: str, style_location: str):
    tree = ET.parse(infile)

    with open(outfile, "wb") as fd:
        fd.write(b'<?xml version="1.0" encoding="utf-8"?>')
        fd.write(bytes(f'<?xml-stylesheet href="{style_location}" type="text/xsl"?>', "utf-8"))
        tree.write(fd)


def main(pelican):
    if not pelican.settings.get("FEED_RSS"):
        logger.debug("No FEED_RSS found is pelican.settings: nothing to do")
        return

    if not pelican.settings.get("STYLED_RSS_STYLE_LOCATION"):
        logger.debug("No STYLED_RSS_STYLE_LOCATION found is pelican.settings: nothing to do")
        return

    feed_rss = os.path.join(pelican.output_path, pelican.settings["FEED_RSS"])
    style_rss(feed_rss, feed_rss, pelican.settings["STYLED_RSS_STYLE_LOCATION"])


def register():
    signals.finalized.connect(main)
