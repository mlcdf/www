"""Define all the routes"""
from flask import Flask, render_template, abort
from markdown import markdown

from app import app, markdown_content


def render_pages(page_name: str, template_name='default.j2', **kwargs) -> str:
    if page_name not in markdown_content:
        abort(404)
    return render_template(
        template_name,
        contents=markdown_content[page_name]['html'],
        metadata=markdown_content[page_name]['metadata'],
        **kwargs,
    )


@app.route("/")
@app.route("/<page>")
def index(page=None):
    if page is None:
        return render_pages('index')
    return render_pages(page)


@app.errorhandler(404)
def not_found(error):
    return render_template('404.j2'), 404


@app.errorhandler(500)
def server_error(error):
    return render_template('500.j2'), 500
