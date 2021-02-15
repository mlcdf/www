import logging
import xml.etree.ElementTree as etree

from markdown.extensions import Extension
from markdown.inlinepatterns import InlineProcessor
from pelican import Pelican, signals

logger = logging.getLogger(__name__)


class StrikeInlineProcessor(InlineProcessor):
    def handleMatch(self, m, data):
        el = etree.Element('del')
        el.text = m.group(1)
        return el, m.start(0), m.end(0)


class StrikeExtension(Extension):
    def extendMarkdown(self, md):
        pattern = r'~~(.*?)~~'  # like ~~strike~~
        md.inlinePatterns.register(StrikeInlineProcessor(pattern, md), 'del', 175)


def initialize(pelican):
    """Add Webassets to Jinja2 extensions in Pelican settings."""
    if "extensions" not in pelican.settings["MARKDOWN"]:
        pelican.settings["MARKDOWN"]["extensions"] = []

    pelican.settings["MARKDOWN"]["extensions"].append(StrikeExtension())


def register():
    signals.initialized.connect(initialize)
