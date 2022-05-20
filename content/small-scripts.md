Title: Petits scripts
Date: 2021-10-16
Category: Articles
Tags: logiciel

Sur chaque projet, c'est toujours les mêmes questions :

- comment je démarre l'application ?
- comment je lance les tests ?
- comment je lance l'image docker ?
- comment je publie le site web ?
- etc

Dans l'écosystème Node.js, on a les [`npm-run-script`](https://docs.npmjs.com/cli/v7/commands/npm-run-script). Ça permet de définir des `scripts` dans le `packages.json` et les lancer via la commande `npm nom-de-mon-script`. À défaut d'être parfait (on regrette par exemple l'impossibilité de faire du multiline vu que c'est du json), c'est hyper pratique et ça a été adopté par la communauté. Si bien que sur la quasi-totalité des projets Node.js, démarrer l'application se résume à lancer `npm start`. Plus de questions à se poser.

Quelle déception quand j'ai découvert qu'il n'y avait pas d'équivalent en Python, Go et dans beaucoup d'autres langages ! Dans la plupart des cas, à la place, on a soit la bonne vieille makefile des familles soit... rien.

Le souci avec les makefiles, c'est que ça requiert `make` et que par conséquent, ça ne fonctionne pas avec Git Bash sur Windows. Impossible donc d'utiliser ça dans un cadre pro par exemple, où 99% des devs ont un poste avec l'OS de Microsoft et rarement accès au WSL. Et c'est une syntaxe un peu particulière.

Puis je suis tombé sur [No script is too simple](https://nicolasbouliane.com/blog/no-script-is-too-simple) de Nicolas Bouliane. Depuis, dans beaucoup de mes projets pro ou perso, j'ai rajouté un répertoire `scripts`. Par exemple, pour ce blog :

```
scripts/
├── build.sh
├── dev.sh
├── docker.sh
├── encrypt.sh
└── publish.sh
```

Si certains scripts sont simplissimes et tiennent en une seule ligne, d'autres vont exécutés tous un tas de commandes et des arguments optionels. Et quand ça dépasse la vingtaine de lignes, je dégaine Python !
