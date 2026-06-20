from django.db import models

class Proyecto(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    tecnologias = models.CharField(max_length=200)
    link_github = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.titulo