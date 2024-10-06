# from django.db import models

# class Location(models.Model):
#     place_name = models.CharField(max_length=100, null=True, blank=True)
#     latitude = models.FloatField()
#     longitude = models.FloatField()

#     def __str__(self):
#         return f"{self.place_name or f'Lat: {self.latitude}, Lon: {self.longitude}'}"



# from django.db import models

# class Location(models.Model):
#     place_name = models.CharField(max_length=100, null=True, blank=True)
#     latitude = models.FloatField(null=True, blank=True)
#     longitude = models.FloatField(null=True, blank=True)

#     def __str__(self):
#         return f"{self.place_name or f'{self.latitude}, {self.longitude}'}"



from django.db import models

class Location(models.Model):
    place_name = models.CharField(max_length=100, null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.place_name or f'{self.latitude}, {self.longitude}'}"


