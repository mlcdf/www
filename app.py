"""Flask app"""
import json
from flask import Flask, render_template

app = Flask(__name__)

with open('locales/en.json') as f:
    locales = json.load(f)


@app.context_processor
def inject_locales():
    """Inject locales into the template context."""
    return locales


@app.route('/')
def index():
    """Index route"""
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
