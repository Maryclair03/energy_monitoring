from django.db import models

class EnergyReading(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    current = models.FloatField()
    power = models.FloatField()
    energy = models.FloatField()
    building = models.CharField(max_length=100, default="Building A")
