from django.urls import path
from .views import *

urlpatterns = [
    path('user/add', ADD_USER.as_view(), name='adduser'),
    path('annees', Annees.as_view(), name='annees'),
    path('matieres/<str:idProf>', Matieres_ByProf.as_view(), name='matiere'),
    path('filieres/alias', FiliereAlias.as_view(), name='filieresAlias'),
    path('groupes/alias/<str:idannee>', GroupesAlias.as_view(), name='groupesAlias'),
    path('etudiant/add', ADD_Etudiant.as_view(), name='signupEtuiant'),
    path('signup/prof', ADD_Prof.as_view(), name='signupProf'),
    path('login', LoginAPI.as_view(), name='signIn'),
    path('get/etudiant/<str:idetud>', One_Etudiant.as_view(), name='oneStudent'),
    path('get/prof/<str:idprof>', One_Prof.as_view(), name='oneteacher'),
    path('annee/groupe/<str:idannee>', Groupes_byAnnee.as_view(), name='groupesByAnnee'),
    path('prof/groupe/<str:idprof>', Groupes_byProf.as_view(), name='groupesByProf'),
    path('get/onegroupe/<str:idgrp>', One_Groupe.as_view(), name='OneGroupe'),
    path('get/oneannee/<str:idannee>', One_Annee.as_view(), name='OneAnnee'),
    path('groupe/<str:idprof>/<str:idannee>', Groupes_byProf_Annee.as_view(), name='groupesByProf_Annee'),
    path('prof/matiere/<str:idprof>', Matiere_byProf.as_view(), name='matiersByProf'),
    path('get/etudiants/<str:idgrp>', Etudiants_byGroupe.as_view(), name='Etudiants_byGroupe'),
    path('get/groupes/', Groupes.as_view(), name='groupes'),
    path('session/add/', ADD_Session.as_view(), name='addSession'),
    path('present/marquer/', make_Present.as_view(), name='MakePresent'),

    path('presence/etudiant/<str:idEtd>', presence_of_student.as_view(), name='listOfpresenceOfStudent'),
    
    path('session/<str:idsession>', Session.as_view(), name='OneSesion'),
    path('prof/session/<str:idprof>', Sessions_byPro.as_view(), name='seancesByProf'),
    path('get/session/<str:idgrp>', Sessions_byGroupe.as_view(), name='seancesByGroupe'),

    path('presence/sessions/<str:idEtd>/<str:idmatiere>', Session_Where_presnt.as_view(), name='listOfpresenceOfStudent'),
    path('get/etudiants/present/<str:idsession>', Students_presnt.as_view(), name='StudentPresent'),
    path('present/confirm/<str:idsession>/<str:idEtd>', Confirm_Presence.as_view(), name='ConfirmPresence'),
    path('present/test/<str:idsession>/<str:idEtd>', Confirm_Presence_SiDeja_present.as_view(), name='EstItPresent'),
    path('prof/get/groupes/<str:idprof>', Groupes_Deriger_Par_Prof.as_view(), name='GroupesDerigerParProf'),
    path('prof/get/groupes/<str:idprof>/<str:idannee>', Groupes_Deriger_Par_Prof_Annee.as_view(), name='GroupesDerigerParProfAnnee'),
    path('add/groupe/derige', Add_Deriger_Groupe.as_view(), name='add_Derige_groupe'),
    path('matiere/add', Add_Matiere.as_view(), name='add_Derige_groupe'),
    # path('user/change/<str:idUser>', Change_Password.as_view(), name='passChange'),
]