from factory import Sequence
from factory.django import DjangoModelFactory, FileField
from foods.models import Recipe, RecipePicture
from factory.fuzzy import FuzzyDateTime
from datetime import datetime
import pytz

class RecipePictureFactory(DjangoModelFactory):
    class Meta:
        model = RecipePicture

    file = FileField(filename="example.jpg")
    created = FuzzyDateTime(start_dt=datetime(2021, 1, 1, tzinfo=pytz.UTC))


class RecipeFactory(DjangoModelFactory):
    class Meta:
        model = Recipe

    name = Sequence(lambda n: "Recipe %d" % n)
