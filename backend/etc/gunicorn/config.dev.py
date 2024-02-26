bind = "unix:/tmp/gunicorn.sock"
workers = 4
wsgi_app = "domomir_backend.wsgi"
reload = True
secure_scheme_headers = {
    "X-FORWARDED-PROTOCOL": "https",
    "X-FORWARDED-PROTO": "https",
    "X-FORWARDED-SSL": "on",
}
