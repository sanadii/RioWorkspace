from django.db import models

# Option Category Model
class OptionCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=150)
    config = models.CharField(max_length=250)

    def __str__(self):
        return self.name

# Option Choices Model
class OptionChoices(models.Model):
    category = models.ForeignKey(OptionCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    config = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.name} - ({self.category})"
