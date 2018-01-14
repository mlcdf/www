"""Define all the routes"""
from flask import Flask, render_template, abort
from markdown import markdown

from app import app, page


@app.route("/")
@app.route("/<page_id>")
def index(page_id=None):
    if page_id is None:
        return page.render('index')
    return page.render(page_id)


@app.errorhandler(404)
def not_found(error):
    return render_template('404.j2'), 404


@app.errorhandler(500)
def server_error(error):
    return render_template('500.j2'), 500
