from django.db import models

class Resource(models.Model):
    name = models.CharField(max_length=100)
    minimize_switching = models.BooleanField(default=False)  # New field

    def __str__(self):
        return self.name

class ResourceItem(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.resource.name} - {self.name}"

