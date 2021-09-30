from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views  import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.





class ADD_USER(APIView):
     def post(self,request):
        data={
            "email":request.data.get("email"),
            "password":make_password(request.data.get("password")),
            "is_Prof" : request.data.get("is_Prof"),
            "is_Etudiant" : request.data.get("is_Etudiant")
        }
        user_to_add = UserSerializer(data=data,many=False)
        if user_to_add.is_valid():
            user_to_add.save()
            return Response(user_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(user_to_add.errors,status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(APIView):
     def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")
        
        user = USER.objects.get(email=email)
        serialized_user = UserSerializer(user ,many=False)
        is_ok = check_password( password, serialized_user.data.get("password"))
        if(is_ok):
            return Response(serialized_user.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized_user.errors,status=status.HTTP_400_BAD_REQUEST)




""" class Change_Password(APIView):
     def put(self, request, idUser):

        password = make_password(request.data.get("password"))
        user = USER.objects.get(id=idUser)
        serialized_user = UserSerializer(user , data=request.data, many=False)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response(serialized_user.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized_user.errors,status=status.HTTP_400_BAD_REQUEST) """


class One_Etudiant(APIView):
    def get(self,request,idetud):        
        if Etudiant.objects.filter(user_id=idetud).exists():
            etudiant = Etudiant.objects.get(user_id=idetud)
            serialized_etudiant = EtudiantSerializer(etudiant,many=False)
            return Response(serialized_etudiant.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class One_Prof(APIView):
    def get(self,request,idprof):        
        if Prof.objects.filter(user_id=idprof).exists():
            prof = Prof.objects.get(user_id=idprof)
            serialized_prof = ProfSerializer(prof,many=False)
            return Response(serialized_prof.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class One_Groupe(APIView):
    def get(self,request,idgrp):        
        if Groupe.objects.filter(id=idgrp).exists():
            groupe = Groupe.objects.get(id=idgrp)
            serialized_groupe = GroupeSerializer(groupe,many=False)
            return Response(serialized_groupe.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class One_Annee(APIView):
    def get(self,request,idannee):        
        if Annee.objects.filter(id=idannee).exists():
            annee = Annee.objects.get(id=idannee)
            serialized_annee = AnneeSerializer(annee,many=False)
            return Response(serialized_annee.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ADD_Etudiant(APIView):
     def post(self,request):
        data={
            "user":request.data.get("user_id"),
            "nom":request.data.get("nom"),
            "prenom":request.data.get("prenom"),
            "annee":request.data.get("annee"),
            "groupe":request.data.get("groupe"),
        }
        etudiant = EtudiantSerializer(data=data,many=False)
        if etudiant.is_valid():
            etudiant.save()
            return Response(etudiant.data,status=status.HTTP_201_CREATED)
        else:
            return Response(etudiant.errors,status=status.HTTP_400_BAD_REQUEST)


class Etudiants_byGroupe(APIView):
    def get(self,request,idgrp):        
        if Etudiant.objects.filter(groupe=idgrp):
            etudiants = Etudiant.objects.filter(groupe=idgrp)
            serialized_etudiants = EtudiantSerializer(etudiants ,many=True)
            return Response(serialized_etudiants.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ADD_Prof(APIView):
     def post(self,request):
        data={
            "user":request.data.get("user_id"),
            "nom":request.data.get("nom"),
            "prenom":request.data.get("prenom"),         
        }
        prof = ProfSerializer(data=data,many=False)
        if prof.is_valid():
            prof.save()
            return Response(prof.data,status=status.HTTP_201_CREATED)
        else:
            return Response(prof.errors,status=status.HTTP_400_BAD_REQUEST)

class Annees(APIView):
    def get(self,request):
        annees = Annee.objects.all()
        annees= AnneeSerializer(annees,many=True)
        return Response(annees.data)

class Matieres_ByProf(APIView):
    def get(self,request, idProf):
        if Matiere.objects.filter(prof=idProf).exists():
            matieres = Matiere.objects.filter(prof=idProf)
            matieres= MatiereSerializer(matieres,many=True)
            return Response(matieres.data)

class FiliereAlias(APIView):
    def get(self,request):
        filieres = Filiere.objects.all()
        filieres = FiliereSerializer(filieres ,many=True)
        return Response(filieres.data)

class GroupesAlias(APIView):
    def get(self,request, idannee):

        if Groupe.objects.filter(annee_id=idannee).exists():
            groupes = Groupe.objects.filter(annee_id=idannee)
            groupes = GroupeSerializer(groupes,many=True)
            return Response(groupes.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Groupes(APIView):
    def get(self,request):
        groupes = Groupe.objects.all()
        groupes= GroupeSerializer(groupes,many=True)
        return Response(groupes.data)


class Groupes_byAnnee(APIView):
    def get(self,request, idannee):
        if Groupe.objects.filter(annee_id=idannee).exists():
            groupes = Groupe.objects.filter(annee_id=idannee)
            groupes = GroupeSerializer(groupes,many=True)
            return Response(groupes.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Groupes_byProf(APIView):
    def get(self,request, idprof):
        if Groupe.objects.filter(prof_id=idprof).exists():
            groupes = Groupe.objects.filter(prof_id=idprof)
            groupes = GroupeSerializer(groupes,many=True)
            return Response(groupes.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)



class Groupes_byProf_Annee(APIView):
    def get(self,request, idprof, idannee):
        if Groupe.objects.filter(prof_id=idprof, annee_id=idannee).exists():
            groupes = Groupe.objects.filter(prof_id=idprof, annee_id=idannee)
            groupes = GroupeSerializer(groupes,many=True)
            return Response(groupes.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)




class Matiere_byProf(APIView):
    def get(self,request, idprof):
        if Matiere.objects.filter(prof_id=idprof).exists():
            matieres = Matiere.objects.filter(prof_id=idprof)
            matieres = MatiereSerializer(matieres,many=True)
            return Response(matieres.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Add_Matiere(APIView):
     def post(self,request):
        data={
            "prof":request.data.get("prof"),
            "Intitule_matiere":request.data.get("matiere"),
        }
        groupe = MatiereSerializer(data=data,many=False)
        if groupe.is_valid():
            groupe.save()
            return Response(groupe.data,status=status.HTTP_201_CREATED)
        else:
            return Response(groupe.errors,status=status.HTTP_400_BAD_REQUEST)

class ADD_Session(APIView):
     def post(self,request):
        data={
            "prof":request.data.get("prof"),
            "date":request.data.get("date"),
            "heureD":request.data.get("heureD"),
            "heureF":request.data.get("heureF"),
            "groupe":request.data.get("groupe"),
            "matiere":request.data.get("matiere"),
            "annee":request.data.get("annee"),
            "nom_grp":request.data.get("groupe_nom"),
            "nom_matiere":request.data.get("matiere_nom"),
            "nom_annee":request.data.get("annee_nom"),
        }
        session = SessionSerializer(data=data,many=False)
        if session.is_valid():
            session.save()
            return Response(session.data,status=status.HTTP_201_CREATED)
        else:
            return Response(session.errors,status=status.HTTP_400_BAD_REQUEST)

class Session(APIView):
     def get(self,request, idsession):
        if Seance.objects.filter(id=idsession).exists():
            seance = Seance.objects.filter(id=idsession)
            seance = SessionSerializer(seance,many=True)
            return Response(seance.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Sessions_byPro(APIView):
     def get(self,request, idprof):
        if Seance.objects.filter(prof_id=idprof).exists():
            seances = Seance.objects.filter(prof_id=idprof)
            seances = SessionSerializer(seances,many=True)
            return Response(seances.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Sessions_byGroupe(APIView):
     def get(self,request, idgrp):
        if Seance.objects.filter(groupe_id=idgrp).exists():
            seances = Seance.objects.filter(groupe_id=idgrp)
            seances = SessionSerializer(seances,many=True)
            return Response(seances.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class Students_presnt(APIView):
     def get(self,request, idsession):
        if Presenting.objects.filter(seance=idsession).exists():
            students = Presenting.objects.filter(seance=idsession)
            students = IsPresentSerializer(students,many=True)
            return Response(students.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Session_Where_presnt(APIView):
     def get(self,request, idEtd, idmatiere):
        if Presenting.objects.filter(etudiant=idEtd, matiere=idmatiere).exists():
            sessionsPresent = Presenting.objects.filter(etudiant=idEtd, matiere=idmatiere)
            sessionsPresent = IsPresentSerializer(sessionsPresent,many=True)
            return Response(sessionsPresent.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class presence_of_student(APIView):
     def get(self,request, idEtd):
        if Presenting.objects.filter(etudiant=idEtd).exists():
            students = Presenting.objects.filter(etudiant=idEtd)
            students = IsPresentSerializer(students,many=True)
            return Response(students.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class make_Present(APIView):
     def post(self,request):
        data={
            "seance":request.data.get("seance"),
            "etudiant":request.data.get("etudiant"),
            "etudiant_nom":request.data.get("etudiant_nom"),
            "etudiant_prenom":request.data.get("etudiant_prenom"),
            "date":request.data.get("date"),
            "heureD":request.data.get("heureD"),
            "heureF":request.data.get("heureF"),
            "groupe":request.data.get("groupe"),
            "matiere":request.data.get("matiere"),
            "nom_grp":request.data.get("groupe_nom"),
            "nom_matiere":request.data.get("matiere_nom"),
        }
        isPresent = IsPresentSerializer(data=data,many=False)
        if isPresent.is_valid():
            isPresent.save()
            return Response(isPresent.data,status=status.HTTP_201_CREATED)
        else:
            return Response(isPresent.errors,status=status.HTTP_400_BAD_REQUEST)


class Confirm_Presence(APIView):
    def put(self,request,idsession,idEtd):  
        confirmation=Presenting.objects.get(seance_id=idsession, etudiant_id=idEtd)
        serializer = IsPresentSerializer(confirmation, data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Confirm_Presence_SiDeja_present(APIView):
     def get(self,request, idsession, idEtd):
        if Presenting.objects.filter(seance_id=idsession, etudiant_id=idEtd).exists():
            seance = Presenting.objects.filter(seance_id=idsession, etudiant_id=idEtd)
            seance = IsPresentSerializer(seance,many=True)
            return Response(seance.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Groupes_Deriger_Par_Prof(APIView):
     def get(self,request, idprof):
        if Groupe_Deriger.objects.filter(prof_id=idprof).exists():
            groupes = Groupe_Deriger.objects.filter(prof_id=idprof)
            groupes = GroupeDerigeSerializer(groupes,many=True)
            return Response(groupes.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Groupes_Deriger_Par_Prof_Annee(APIView):
     def get(self,request, idprof, idannee):
        if Groupe_Deriger.objects.filter(prof_id=idprof, annee_id=idannee).exists():
            groupes = Groupe_Deriger.objects.filter(prof_id=idprof, annee_id=idannee)
            groupes = GroupeDerigeSerializer(groupes,many=True)
            return Response(groupes.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class Add_Deriger_Groupe(APIView):
     def post(self,request):
        data={
            "prof":request.data.get("prof"),
            "groupe":request.data.get("groupe"),
            "matiere":request.data.get("matiere"),
            "annee":request.data.get("annee"),
            "nom_matiere":request.data.get("matiere_nom"),
            "nom_grp":request.data.get("groupe_nom"),
            "nom_annee":request.data.get("annee_nom"),
        }
        groupe = GroupeDerigeSerializer(data=data,many=False)
        if groupe.is_valid():
            groupe.save()
            return Response(groupe.data,status=status.HTTP_201_CREATED)
        else:
            return Response(groupe.errors,status=status.HTTP_400_BAD_REQUEST)