#!/bin/bash
cd /app

if [[ "$1" == "test" ]]; then
    pytest -vs
else
    python manage.py collectstatic --noinput
    python manage.py migrate 
    service nginx start
    gunicorn --config $GUNICORN_CONFIG
fi
