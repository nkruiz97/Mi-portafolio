from django.contrib import admin
from django.urls import path
from proyectos.views import lista_proyectos

urlpatterns = [
    path('admin/', admin.site.admin_url if hasattr(admin.site, 'admin_url') else admin.site.urls),
    path('api/proyectos/', lista_proyectos, name='lista_proyectos'),  # <-- Nueva ruta
]