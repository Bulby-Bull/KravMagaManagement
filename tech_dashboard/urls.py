from django.urls import path
from . import views

urlpatterns = [
    path('', views.tech_dash_main, name='tech_dash_main'),
]