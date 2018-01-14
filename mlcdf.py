import os

from app import app


@app.cli.command()
def dev():
    """Start the Flask server in DEBUG mode"""
    os.environ["FLASK_DEBUG"] = '1'
    app.run()
