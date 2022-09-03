
from domomir_backend.celery import app
from foods import utils


@app.task
def clean_temp_pictures():
    utils.clean_temp_pictures()

@app.task
def clean_shopping_list():
    utils.clean_shopping_list()
