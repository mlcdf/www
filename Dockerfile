FROM python:3.9.7-bullseye

WORKDIR /website

COPY Pipfile .
COPY Pipfile.lock .

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y locales

RUN sed -i -e 's/# fr_FR.UTF-8 UTF-8/fr_FR.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=fr_FR.UTF-8

ENV LANG fr_FR.UTF-8 

RUN python3 -m pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile
