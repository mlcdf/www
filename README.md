# www.mlcdf.fr
[![Production](https://github.com/mlcdf/www/actions/workflows/production.yml/badge.svg?branch=blog)](https://github.com/mlcdf/www/actions/workflows/production.yml)

The code behind my personal website.

About the branches:

- `blog` represents what's currrently deployed in production.
- `dev` represents what's currrently deployed in development.
- The remaining ones are old versions (some of which never reached production).

## Development

Set the OS locale:
```console
export LC_ALL="fr_FR.UTF-8"
export LC_CTYPE="fr_FR.UTF-8"
sudo dpkg-reconfigure locales
```
