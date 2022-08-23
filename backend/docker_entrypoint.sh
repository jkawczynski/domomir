#!/bin/bash
cd /app

if [[ "$1" == "test" ]]; then
    pytest -vs
elif [[ "$1" == "dev" ]]; then
    python manage.py collectstatic --noinput
    python manage.py migrate 
    service nginx start
    uwsgi --ini /srv/uwsgi/uwsgi.dev.ini
else
    python manage.py collectstatic --noinput
    python manage.py migrate 
    service nginx start
    uwsgi --ini /srv/uwsgi/uwsgi.ini
fi
