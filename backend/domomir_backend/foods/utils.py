from datetime import datetime, timedelta

from foods.models import RecipePicture

def clean_temp_pictures():
    """
    Removes all recipe pictures that are not used with
    any recipe, (picture uploaded but form was not submitted).
    Remove only older than one day to make sure we are not removing
    anything during form submition.
    """
    now = datetime.now()
    print(now)
    pictures = RecipePicture.objects.filter(
        recipe__isnull=True, created__lte=now - timedelta(days=1)
    )
    print("pictuuuures", RecipePicture.objects.all().get().created)
    for picture in pictures:
        picture.file.delete()
        picture.delete()
