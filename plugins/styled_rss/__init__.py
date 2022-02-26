from pelican import signals

import os 
import xml.etree.ElementTree as ET


def style_rss(infile: str, outfile: str, style_location: str):
    tree = ET.parse(infile)

    with open(outfile, "wb") as fd:
        fd.write(b'<?xml version="1.0" encoding="utf-8"?>')
        fd.write(bytes(f'<?xml-stylesheet href="{style_location}" type="text/xsl"?>', "utf-8"))
        tree.write(fd)
        

def main(pelican):
    feed_rss = os.path.join(pelican.output_path, pelican.settings["FEED_RSS"])
    style_rss(feed_rss, feed_rss, pelican.settings.get("STYLED_RSS_STYLE_LOCATION"))

def register():
    signals.finalized.connect(main)
