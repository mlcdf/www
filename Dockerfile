FROM python:3.9.7-slim-bullseye

WORKDIR /website

# Locale stuff
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y locales --no-install-recommends

RUN sed -i -e 's/# fr_FR.UTF-8 UTF-8/fr_FR.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=fr_FR.UTF-8

ENV LANG fr_FR.UTF-8 

# Install Python dependencies
COPY Pipfile Pipfile.lock ./
RUN python3 -m pip --no-cache-dir install pipenv
RUN pipenv install --system --deploy --ignore-pipfile --clear
