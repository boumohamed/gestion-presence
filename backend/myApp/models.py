from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class Responsable(BaseUserManager):
    
    def create_user(self, email, password = None):
        if not email:
            raise ValueError('EMAIL IS REQUIRED ')
        user = self.model(
            email = self.normalize_email(email)
        )
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password = None):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password
        )
        user.is_admin = True
        user.is_staff = True
        user.save()
        return user
    def create_staffuser(self, email, password = None):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password
        )
        user.is_staff = True
        user.save()
        return user

class USER(AbstractBaseUser):
    email        = models.EmailField(max_length=80, unique=True)
    dateCreation = models.DateTimeField(auto_now_add=True)
    is_admin     = models.BooleanField(default=False)
    is_active    = models.BooleanField(default=True)
    is_staff     = models.BooleanField(default=False)
    is_Prof      = models.BooleanField(default=False)
    is_Etudiant  = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    objects = Responsable()
    def __str__(self):
        return self.email 
    def has_perm(self, perm, obj = None):
        return True
    def has_module_perms(self, app_label):
        return True

class utilisateur(models.Model):
    user   = models.ForeignKey(USER,on_delete=models.SET_NULL,null=True)
    nom    = models.CharField(max_length=210,null=True,blank=True)
    prenom = models.CharField(max_length=220,null=True,blank=True)
    type   = models.CharField(max_length=100,null=False,blank=False)   

    def __str__(self):
        return self.nom + ' ' + self.prenom + ' -> ' + self.type


    


class Annee(models.Model):
    nom_annee = models.CharField(max_length=210,null=True,blank=True)

    def __str__(self):
        return self.nom_annee


class Filiere(models.Model):
    nom_filiere = models.CharField(max_length=210,null=True,blank=True)

    def __str__(self):
        return self.nom_filiere 




class Prof(models.Model):
    user   = models.ForeignKey(USER,on_delete=models.SET_NULL,null=True)
    nom    = models.CharField(max_length=210,null=True,blank=True)
    prenom = models.CharField(max_length=220,null=True,blank=True)

    def __str__(self):
        return self.nom + ' ' + self.prenom


class Groupe(models.Model):
    annee   = models.ForeignKey(Annee,on_delete=models.SET_NULL,null=True)
    filiere = models.ForeignKey(Filiere,on_delete=models.SET_NULL,null=True)
    nom_grp = models.CharField(max_length=210,null=True,blank=True)

    def __str__(self):
        return str(self.annee) + ' ' + self.nom_grp 

class Matiere(models.Model):
    prof             = models.ForeignKey(Prof,on_delete=models.SET_NULL,null=True)
    Intitule_matiere = models.CharField(max_length=210,null=True,blank=True)

    def __str__(self):
        return  self.Intitule_matiere 

class Etudiant(models.Model):
    user   = models.ForeignKey(USER,on_delete=models.SET_NULL,null=True)
    annee  = models.ForeignKey(Annee, on_delete=models.SET_NULL,null=True)
    groupe = models.ForeignKey(Groupe, on_delete=models.SET_NULL,null=True)
    nom    = models.CharField(max_length=210,null=True,blank=True)
    prenom = models.CharField(max_length=220,null=True,blank=True)

    def __str__(self):
        return self.nom + ' ' + self.prenom

class Seance(models.Model):
    prof        = models.ForeignKey(Prof,on_delete=models.SET_NULL,null=True)
    matiere     = models.ForeignKey(Matiere,on_delete=models.SET_NULL,null=True)
    groupe      = models.ForeignKey(Groupe,on_delete=models.SET_NULL,null=True)
    annee       = models.ForeignKey(Annee,on_delete=models.SET_NULL,null=True)
    nom_matiere = models.CharField(max_length=210,null=True,blank=True) 
    nom_grp     = models.CharField(max_length=210,null=True,blank=True)
    nom_annee   = models.CharField(max_length=210,null=True,blank=True)
    date        = models.CharField(max_length=210,null=True,blank=True)
    heureD      = models.CharField(max_length=210,null=True,blank=True)
    heureF      = models.CharField(max_length=210,null=True,blank=True)

    def __str__(self):
        return self.date + ' ' + self.nom_matiere



class Presenting(models.Model):
    seance          = models.ForeignKey(Seance,on_delete=models.SET_NULL,null=True)
    etudiant        = models.ForeignKey(Etudiant,on_delete=models.SET_NULL,null=True)
    matiere         = models.ForeignKey(Matiere,on_delete=models.SET_NULL,null=True)
    groupe          = models.ForeignKey(Groupe,on_delete=models.SET_NULL,null=True)
    nom_matiere     = models.CharField(max_length=210,null=True,blank=True) 
    nom_grp         = models.CharField(max_length=210,null=True,blank=True)
    date            = models.CharField(max_length=210,null=True,blank=True)
    heureD          = models.CharField(max_length=210,null=True,blank=True)
    heureF          = models.CharField(max_length=210,null=True,blank=True)
    etudiant_nom    = models.CharField(max_length=210,null=True,blank=True)
    etudiant_prenom = models.CharField(max_length=210,null=True,blank=True)
    present         = models.BooleanField(default=False)
    presence_heure    = models.CharField(max_length=210,null=True,blank=True)

    def __str__(self):
        return str(self.etudiant) + ' ' + self.date + ' ' + str(self.present)

class Groupe_Deriger(models.Model):
    prof            = models.ForeignKey(Prof,on_delete=models.SET_NULL,null=True)
    groupe          = models.ForeignKey(Groupe,on_delete=models.SET_NULL,null=True)
    matiere         = models.ForeignKey(Matiere,on_delete=models.SET_NULL,null=True)
    annee           = models.ForeignKey(Annee, on_delete=models.SET_NULL,null=True)
    nom_matiere     = models.CharField(max_length=210,null=True,blank=True) 
    nom_grp         = models.CharField(max_length=210,null=True,blank=True)
    nom_annee       = models.CharField(max_length=210,null=True,blank=True)
   

    def __str__(self):
        return str(self.prof) + ' ' + str(self.groupe) + ' ' + str(self.matiere)