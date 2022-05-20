import datetime

from pelican import signals
from pelican.contents import Article
from pelican.readers import BaseReader

from typographeur import typographeur


def addArticle(articleGenerator):
    settings = articleGenerator.settings

    for article in articleGenerator.articles:
        article._content = typographeur(article._content, fix_semicolon=False)


def register():
    signals.article_generator_finalized.connect(addArticle)
