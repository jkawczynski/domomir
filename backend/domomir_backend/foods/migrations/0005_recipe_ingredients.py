# Generated by Django 4.0.1 on 2022-02-08 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foods', '0004_recipe_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='ingredients',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
