import glob
import os
import pprint

from flask import Flask
import markdown
import frontmatter

from app.config import config
from app.flask_page import FlaskPage

page = FlaskPage()

def create_app(env):
    app = Flask(__name__, static_url_path='/static')
    app.config.from_object(config[env])

    page.init_app(app)

    return app


app = create_app(os.getenv('FLASK_CONFIG') or 'default')
from app import routes
