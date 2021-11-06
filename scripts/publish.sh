#!/bin/sh

set -eu

GIT_BRANCH=${GIT_BRANCH:=$(git rev-parse --abbrev-ref HEAD)}

if [ $GIT_BRANCH = "blog" ]; then
  SITEURL="https://www.mlcdf.fr"
else
  SITEURL="https://${GIT_BRANCH}.www.mlcdf.fr"
fi

echo "\e[1;34mBuilding ${SITEURL}\e[0m"
pelican --delete-output-directory --settings publishconf.py

# For local push only
FILE=/website/.env
if [ -f "$FILE" ]; then
    . ${FILE}
fi

export RCLONE_CONFIG_CELLAR_TYPE="s3"
DOMAIN=$(echo ${SITEURL} | sed 's/https\?:\/\///')

echo "\e[1;34mDeploying to ${DOMAIN}\e[0m"
rclone sync ./output cellar:$DOMAIN --progress --s3-acl=public-read
