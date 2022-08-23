FROM python:3.10
MAINTAINER jkawczynski

ENV APP_ROOT=/app
ENV ETC_ROOT=/srv

RUN apt-get update \
    && apt-get install -y \
        python-dev \
        build-essential \
        nginx

RUN adduser --uid 1000 app --gecos app --disabled-password

RUN touch /var/run/nginx.pid && \
    mkdir /var/cache/nginx && \
    chown -R app:app /var/run/nginx.pid && \
    chown -R app:app /var/log/nginx && \
    chown -R app:app /var/lib/nginx && \
    chown -R app:app /var/cache/nginx

ADD requirements.txt $APP_ROOT/
WORKDIR $APP_ROOT
RUN pip install uwsgi && \
    pip install -r requirements.txt

ADD docker/server/nginx/nginx.conf /etc/nginx/nginx.conf
ADD docker/server/uwsgi/* $ETC_ROOT/uwsgi/
ADD domomir_backend $APP_ROOT/
ADD docker_entrypoint.sh $ETC_ROOT

RUN chmod +x $ETC_ROOT/docker_entrypoint.sh && \
    chown app:app -R $APP_ROOT && \
    chown app:app -R $ETC_ROOT

USER app

EXPOSE 8000
ENTRYPOINT ["/srv/docker_entrypoint.sh"]

