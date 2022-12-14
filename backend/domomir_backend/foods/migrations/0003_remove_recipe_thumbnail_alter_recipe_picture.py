# Generated by Django 4.0.1 on 2022-01-31 12:04

from django.db import migrations
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('foods', '0002_recipe_thumbnail_alter_recipe_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='thumbnail',
        ),
        migrations.AlterField(
            model_name='recipe',
            name='picture',
            field=easy_thumbnails.fields.ThumbnailerImageField(blank=True, null=True, upload_to='recipe_pictures/'),
        ),
    ]
