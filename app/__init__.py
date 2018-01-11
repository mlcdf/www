import glob
import os
import pprint

from flask import Flask
import markdown
import frontmatter

app = Flask(__name__, static_url_path='/static')
app.config.from_object('app.config.DevelopmentConfig')


def read_pages():
    files = glob.glob('app/pages/*.html')
    files.extend(glob.glob('app/pages/*.md'))
    content = {}
    for filepath in files:
        filename = os.path.basename(filepath)
        content[os.path.splitext(filename)[0]] = parse_markdown(filepath)
    app.logger.info("Pages registred: %s" % content.keys())
    return content


def parse_markdown(filepath: str):
    markdown_parser = markdown.Markdown()
    file_parts = frontmatter.load(filepath)

    return {
        'html': markdown_parser.convert(file_parts.content),
        'metadata': file_parts.metadata
    }


markdown_content = read_pages()

from app import routes
