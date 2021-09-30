# Generated by Django 3.2.7 on 2021-09-16 15:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0014_matiere'),
    ]

    operations = [
        migrations.CreateModel(
            name='Seance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom_matiere', models.CharField(blank=True, max_length=210, null=True)),
                ('nom_grp', models.CharField(blank=True, max_length=210, null=True)),
                ('nom_annee', models.CharField(blank=True, max_length=210, null=True)),
                ('date', models.CharField(blank=True, max_length=210, null=True)),
                ('heureD', models.CharField(blank=True, max_length=210, null=True)),
                ('heureF', models.CharField(blank=True, max_length=210, null=True)),
                ('annee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.annee')),
                ('groupe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.groupe')),
                ('matiere', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.matiere')),
                ('prof', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.prof')),
            ],
        ),
    ]