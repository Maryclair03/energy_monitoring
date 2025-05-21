from django.urls import path
from .views import EnergyReadingListCreate

urlpatterns = [
    path('energy/', EnergyReadingListCreate.as_view(), name='energy-list-create'),
]
