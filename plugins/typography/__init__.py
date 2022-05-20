from pelican import signals

from typographeur import typographeur


def apply_rules_for_articles(articleGenerator):
    settings = articleGenerator.settings

    for article in articleGenerator.articles:
        article._content = typographeur(article._content, fix_semicolon=False)


def apply_rules_for_pages(pageGenerator):
    for page in pageGenerator.pages:
        page._content = typographeur(page._content, fix_semicolon=False)


def register():
    signals.article_generator_finalized.connect(apply_rules_for_articles)
    signals.page_generator_finalized.connect(apply_rules_for_pages)
