# Generated by Django 4.0.1 on 2022-09-05 17:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fitness', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trainingexercise',
            old_name='sets',
            new_name='set_number',
        ),
        migrations.AddField(
            model_name='trainingexercise',
            name='completed',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='trainingexercise',
            name='started',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='trainingplan',
            name='training',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='training_plan', to='fitness.training'),
        ),
        migrations.AlterField(
            model_name='training',
            name='completed',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='trainingexercise',
            name='reps',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]