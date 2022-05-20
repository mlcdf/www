Title: Gérer ses dotfiles avec Python
Date: 2022-05-15
Category: Articles

Je gère désormais mes [dotfiles](https://wiki.archlinux.org/title/Dotfiles) via de [simple scripts Python](https://github.com/mlcdf/dotfiles). Pourquoi avoir fait ce choix au lieu d'autres outils plus communément utilisés comme `stow`, `chezmoi` ou `ansible` ? C'est ce que nous allons voir !

## Bash/zsh : les débuts

Comme beaucoup, j'ai commencé en forkant un dépôt populaire de dotfiles sur GitHub. De mémoire, mon dévolu s'est jeté sur [holman/dotfiles](https://github.com/holman/dotfiles), que j'ai grossièrement customisé au fil des mois.

Mon aversion pour les languages de scripts shell Unix et certains de leurs paradigmes m'a poussé à chercher une autre option.

## Ansible

Après être tombé sur quelques depôts de dotfiles gérés avec [Ansible](https://docs.ansible.com/ansible/latest/index.html), je me suis dis que j'allais faire pareil. Puis c'était aussi l'occasion d'appronfondir mes connaissances sur l'outil.

Pire idée de la Terre.

Je vous explique :

- il vous faut désormais Ansible pour lancer votre install. Si vous avez de la chance, le paquet apt/rpm ansible fourni par votre distibution est assez récent. Dans le cas contraire, il va falloir l'installer via pip et l'ajouter dans votre `$PATH` (encore un truc à gérer en plus en somme).
- l'exécution est abyssalement lente. Genre plusieurs *secondes* pour copier quelques fichiers et faire des liens symboliques. Aaaauuu secouuuurs !
- entre la documentation d'ansible et celle de ses modules, ça fait des kilomètres de documentation à se palucher.
- écrire du yaml, et du yaml façon Ansible avec de l'interpolation de code au milieu du yaml, c'est assez déplaisant.

Un point positif cela dit, si on utilise aussi Ansible pour déployer des logiciels sur sa Raspberry Pi ou autre, on peut peut-être factoriser certaines installations (client torrent ou nextcloud, par exemple).


## GNU Stow : la solution minimaliste

Loin de la complexité d'Ansible, [Stow](https://www.gnu.org/software/stow/) qui brille par sa simplicité. Il gère (et génère) des liens symboliques via des instructions en ligne de commande, c'est tout. Pas besoin d'aller se palucher des kilomètres de docs avant de l'utiliser, ni d'écrire du yaml.


Par contre, je me retrouvais de temps en temps avec des conflits, du type "création d'un lien symbolique avec une cible qui existe déjà". Et là, Stow est bloqué. Il faut aller supprimer le fichier ou dossier à la main. Rien de dramatique en soi, mais un peu iritant à l'usage.

## Python

Arrive Python. Bon déjà, je prends un plaisir fou à écrire du code dans ce langage alors forcément, mon avis est un peu ~~beaucoup~~ biaisé. Mais justement, il est aussi là mon argument : quitte à devoir écrire du code, autant le faire dans un language que l'on apprécie et prendre du plaisir.

Python, c'est aussi *le* "langage de glu" et de scripts par excellence.

L'un de ses principales forces, c'est sa bibliothèque standard ~~et son [module antigravité](https://xkcd.com/353/)~~. Le module `shutil` par exemple donne un équivalent à des programmes shell de base : `rm` (rmtree), `cp` (copy et copytree), `which` ou encore `chown`.
Il y a même un module pour interagir avec le registre Windows &mdash; dont je me sers pour définir mes variables d'environnement !

Oui, vu que Python est multi-plateforme, je l'utilise aussi pour configurer ma tour sous Windows en plus de mon portable sous Linux. Résultat, un seul langage pour les deux OS, et un langage me permet d'écrire des scripts beaucoup plus robustes qu'en shell (via annotations, tests, meilleure gestion des erreurs, etc).

Sur la plupart des distributions Linux, vous avez même pas besoin de l'installer vous-même, il vient avec votre distro.

## Conclusion

À choisir entre Python, du bash ou des cadriciels comme Ansible (ou [chezmoi](https://www.chezmoi.io/)[^1]) pour gérer ses dotfiles, il y a pas photo : Python, haut la main ! Voire même Ruby ou Node.js[^2] si c'est plus votre truc.

Pour les curieuses et curieux, le code est disponible ici : [github.com/mlcdf/dotfiles](https://github.com/mlcdf/dotfiles).

[^1]: [chezmoi.io](https://www.chezmoi.io/) ; pas testé mais il semble s'appuyer sur du yaml et templating encore une fois
