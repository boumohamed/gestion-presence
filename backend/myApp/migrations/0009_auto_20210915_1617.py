# Generated by Django 3.2.7 on 2021-09-15 15:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0008_auto_20210915_1604'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='groupe',
            name='nom_annee',
        ),
        migrations.RemoveField(
            model_name='groupe',
            name='nom_filiere',
        ),
    ]
