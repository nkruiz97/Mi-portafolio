from django.http import JsonResponse
from .models import Proyecto

def lista_proyectos(request):
    # Traemos todos los proyectos de la base de datos
    proyectos = Proyecto.objects.all()
    
    # Los convertimos en una lista de diccionarios (formato JSON)
    data = []
    for p in proyectos:
        data.append({
            'titulo': p.titulo,
            'descripcion': p.descripcion,
            'tecnologias': p.tecnologias,
            'link_github': p.link_github
        })
    
    # Devolvemos la respuesta al navegador/frontend
    return JsonResponse(data, safe=False)