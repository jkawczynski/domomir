from datetime import datetime, timedelta

import pytest
import pytz
from foods.models import RecipePicture
from foods.utils import clean_temp_pictures

from .factories import RecipePictureFactory


@pytest.mark.parametrize(
    "delta,should_exists",
    [
        ({"hours": 1}, True),
        ({"hours": 4}, True),
        ({"days": 1}, False),
        ({"days": 7}, False),
    ],
)
@pytest.mark.django_db
def test_clean_temp_files(delta, should_exists):
    created = datetime.now(tz=pytz.UTC) - timedelta(**delta)
    picture = RecipePictureFactory(
        created=created,
        recipe=None,
    )

    assert picture.file is not None

    clean_temp_pictures()

    assert RecipePicture.objects.filter(pk=picture.pk).exists() == should_exists
