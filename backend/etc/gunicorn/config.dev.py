bind = "unix:/tmp/gunicorn.sock"
workers = 4
wsgi_app = "domomir_backend.wsgi"
reload = True
