# -*- coding: utf-8 -*-

import os
import shutil
import sys
import json
import datetime

from invoke import task
from pelican.server import ComplexHTTPRequestHandler, RootedHTTPServer

CONFIG = {
    # Local path configuration (can be absolute or relative to tasks.py)
    "deploy_path": "output",
    # Port for `serve`
    "port": 8000,
}


@task
def clean(c):
    """Remove generated files"""
    if os.path.isdir(CONFIG["deploy_path"]):
        shutil.rmtree(CONFIG["deploy_path"])
        os.makedirs(CONFIG["deploy_path"])


@task
def build(c):
    """Build local version of site"""
    c.run("pelican -s pelicanconf.py")


@task
def format(c):
    """Format Python code"""
    c.run("black .")


@task
def rebuild(c):
    """`build` with the delete switch"""
    c.run("pelican -d -s pelicanconf.py")


@task
def regenerate(c):
    """Automatically regenerate site upon file modification"""
    c.run("pelican -r -s pelicanconf.py")


@task
def devserver(c):
    """Automatically regenerate site upon file modification"""
    c.run("pelican -r -s pelicanconf.py")


@task
def serve(c):
    """Serve site at http://localhost:8000/"""

    class AddressReuseTCPServer(RootedHTTPServer):
        allow_reuse_address = True

    server = AddressReuseTCPServer(
        CONFIG["deploy_path"], ("", CONFIG["port"]), ComplexHTTPRequestHandler
    )

    sys.stderr.write("Serving on port {port} ...\n".format(**CONFIG))
    server.serve_forever()


@task
def reserve(c):
    """`build`, then `serve`"""
    build(c)
    serve(c)


@task
def preview(c):
    """Build production version of site"""
    c.run("pelican -s publishconf.py")


@task
def publish(c):
    """Publish to production via rsync"""
    c.run("pelican -s publishconf.py")
    c.run(
        'rsync --delete --exclude ".DS_Store" -pthrvz -c '
        "{} {production}:{dest_path}".format(
            CONFIG["deploy_path"].rstrip("/") + "/", **CONFIG
        )
    )


@task
def films(c):
    with open("./films.json", "r") as fd:
        films = json.load(fd)

    filtered = [
        f for f in films if ("watchedDate" in f and f["watchedDate"].startswith("2019"))
    ]

    def _sort(elem):
        year, month, day = _parse_isoformat_date(elem["watchedDate"])

        day = 1 if day == 0 else day
        day = 1 if day == 0 else day
        print(month)
        return datetime.date(year, month, day)

    for f in sorted(filtered, key=_sort):
        print("%s (%d)" % (f["frenchTitle"], f["year"]))


def _parse_isoformat_date(dtstr):
    # It is assumed that this function will only be called with a
    # string of length exactly 10, and (though this is not used) ASCII-only
    year = int(dtstr[0:4])
    if dtstr[4] != "-":
        raise ValueError("Invalid date separator: %s" % dtstr[4])

    month = int(dtstr[5:7])

    if dtstr[7] != "-":
        raise ValueError("Invalid date separator")

    day = int(dtstr[8:10])

    return year, month, day
