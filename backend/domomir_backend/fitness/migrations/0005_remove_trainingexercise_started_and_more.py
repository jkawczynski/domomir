# Generated by Django 4.0.1 on 2023-01-03 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fitness', '0004_alter_trainingexercise_training_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trainingexercise',
            name='started',
        ),
        migrations.AddField(
            model_name='trainingexercise',
            name='skipped',
            field=models.BooleanField(default=False),
        ),
    ]