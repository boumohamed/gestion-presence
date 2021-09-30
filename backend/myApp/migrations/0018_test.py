# Generated by Django 3.2.7 on 2021-09-17 13:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0017_rename_ispresent_present'),
    ]

    operations = [
        migrations.CreateModel(
            name='TEST',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom_matiere', models.CharField(blank=True, max_length=210, null=True)),
                ('nom_grp', models.CharField(blank=True, max_length=210, null=True)),
                ('date', models.CharField(blank=True, max_length=210, null=True)),
                ('heureD', models.CharField(blank=True, max_length=210, null=True)),
                ('heureF', models.CharField(blank=True, max_length=210, null=True)),
                ('etudiant_nom', models.CharField(blank=True, max_length=210, null=True)),
                ('etudiant_prenom', models.CharField(blank=True, max_length=210, null=True)),
                ('present', models.BooleanField(default=False)),
                ('present_date', models.CharField(blank=True, max_length=210, null=True)),
                ('etudiant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.etudiant')),
                ('groupe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.groupe')),
                ('matiere', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.matiere')),
                ('seance', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myApp.seance')),
            ],
        ),
    ]