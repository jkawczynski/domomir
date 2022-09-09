#!/bin/bash
cd /app

if [[ "$1" == "test" ]]; then
    pytest -vs
elif [[ "$1" == "celery-worker" ]]; then
    celery -A domomir_backend worker --beat -l INFO
elif [[ "$1" == "celery-beat" ]]; then
    celery -A domomir_backend worker -l INFO
elif [[ "$1" == "create-test-user" ]]; then
    python manage.py create_test_user
else
    python manage.py collectstatic --noinput
    python manage.py migrate 
    service nginx start
    gunicorn --config $GUNICORN_CONFIG
fi
