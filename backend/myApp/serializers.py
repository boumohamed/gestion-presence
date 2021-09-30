  
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = '__all__'

class AnneeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annee
        fields = '__all__'



class GroupeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groupe
        fields = '__all__'

class FiliereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filiere
        fields = '__all__'


class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields = '__all__'

class ProfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prof
        fields = '__all__'

class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seance
        fields = '__all__'


class IsPresentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presenting
        fields = '__all__'

class GroupeDerigeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groupe_Deriger
        fields = '__all__'
