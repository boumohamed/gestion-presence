# Generated by Django 3.2.7 on 2021-09-15 17:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0011_remove_annee_nom_filiere'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='etudiant',
            name='filiere',
        ),
    ]
