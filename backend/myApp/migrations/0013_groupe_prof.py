# Generated by Django 3.2.7 on 2021-09-16 11:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0012_remove_etudiant_filiere'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupe',
            name='prof',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.prof'),
        ),
    ]
