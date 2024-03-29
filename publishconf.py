#!/usr/bin/env python3
import os
import sys

sys.path.append(os.curdir)
from pelicanconf import *

# Allows to build for both staging and prod
SITEURL = os.environ.get("SITEURL", SITEURL)
if "http" not in SITEURL:
    raise Exception("Missing protocol in SITEURL (http:// or https://)")

FEED_DOMAIN = SITEURL

RELATIVE_URLS = False

FEED_RSS = "feed.xml"
RSS_FEED_SUMMARY_ONLY = False

DELETE_OUTPUT_DIRECTORY = True
ASSET_REV_ENABLE = True

CACHE_CONTENT = False
LOAD_CONTENT_CACHE = False
