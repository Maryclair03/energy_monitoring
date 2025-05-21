from rest_framework import generics
from .models import EnergyReading
from .serializers import EnergyReadingSerializer

class EnergyReadingListCreate(generics.ListCreateAPIView):
    queryset = EnergyReading.objects.all().order_by('-timestamp')
    serializer_class = EnergyReadingSerializer
