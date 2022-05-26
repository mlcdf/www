Title: Pipenv scripts
Date: 2022-05-22
Category: Articles
Tags: logiciel

Après avoir passé des mois (années ?) à me plaindre qu'il y avait pas d'équivalent aux [`npm-run-script`](https://docs.npmjs.com/cli/v7/commands/npm-run-script), j'ai récemment découvert qu'il existait une solution similaire via [pipenv](https://pipenv.pypa.io/en/latest/advanced/#custom-script-shortcuts) !

Je m'en sers dans le dépôt qui construit ce site même, ça donne ça :

```toml
[scripts]
dev = "./scripts/dev.py"
publish = "pelican --settings publishconf.py --delete-output-directory"
preview = "env PREVIEW=True pelican --settings publishconf.py --delete-output-directory --listen --autoreload"
clean = "rm -rf ./cache ./output"
```

Et pour lancer une commande :
```python
pipenv run dev
```

## Limitations
