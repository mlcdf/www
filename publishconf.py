#!/usr/bin/env python3
import os
import sys

sys.path.append(os.curdir)
from pelicanconf import *

# Allows to build for both staging and prod
SITEURL = os.environ["SITEURL"]

RELATIVE_URLS = False

FEED_RSS = "rss.xml"

DELETE_OUTPUT_DIRECTORY = True
ASSET_REV_ENABLE = True
