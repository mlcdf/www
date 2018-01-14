import glob
import os

import markdown
import frontmatter
from flask import render_template, abort

class FlaskPage(object):

    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        files = glob.glob('app/pages/*.html')
        files.extend(glob.glob('app/pages/*.md'))
        self.content = {}
        for filepath in files:
            filename = os.path.basename(filepath)
            self.content[os.path.splitext(filename)[0]
                   ] = self._parse_markdown(filepath)

    def _parse_markdown(self, filepath: str):
        markdown_parser = markdown.Markdown()
        file_parts = frontmatter.load(filepath)

        return {
            'html': markdown_parser.convert(file_parts.content),
            'metadata': file_parts.metadata
        }

    def render(self, page_name: str, template_name='default.j2', **kwargs) -> str:
        if page_name not in self.content:
            abort(404)
        return render_template(
            template_name,
            contents=self.content[page_name]['html'],
            metadata=self.content[page_name]['metadata'],
            **kwargs,
        )
