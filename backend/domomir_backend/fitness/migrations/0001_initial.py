# Generated by Django 4.0.1 on 2022-09-05 09:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started', models.DateTimeField(default=django.utils.timezone.now)),
                ('completed', models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ('description', models.CharField(max_length=128)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TrainingPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weekday', models.CharField(choices=[('1', 'Monday'), ('2', 'Tuesday'), ('3', 'Wednsday'), ('4', 'Thursday'), ('5', 'Friday'), ('6', 'Saturday'), ('7', 'Sunday')], default='1', max_length=2)),
                ('description', models.CharField(blank=True, max_length=128, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('weekday',),
                'unique_together': {('weekday', 'owner')},
            },
        ),
        migrations.CreateModel(
            name='TrainingPlanExercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveSmallIntegerField()),
                ('name', models.CharField(max_length=255)),
                ('sets', models.PositiveSmallIntegerField()),
                ('reps', models.PositiveSmallIntegerField(null=True)),
                ('starting_weight', models.PositiveSmallIntegerField(null=True)),
                ('training_plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exercises', to='fitness.trainingplan')),
            ],
        ),
        migrations.CreateModel(
            name='TrainingExercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('reps', models.PositiveSmallIntegerField()),
                ('sets', models.PositiveSmallIntegerField(null=True)),
                ('weight', models.PositiveSmallIntegerField(null=True)),
                ('training', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fitness.training')),
            ],
        ),
    ]
