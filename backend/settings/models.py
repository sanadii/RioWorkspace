from django.db import models


class SettingOption(models.Model):
    name = models.CharField(max_length=255, unique=True, null=True)
    value = models.TextField(null=True)
    autoload = models.BooleanField(default=True)

    class Meta:
        db_table = "settings_option"
        verbose_name = "Setting Option"
        verbose_name_plural = "Setting Options"
        default_permissions = []
        permissions = [
            ("canViewOptions", "Can View Options"),
            ("canAddOptions", "Can Add Options"),
            ("canChangeOptions", "Can Change Options"),
            ("canDeleteOptions", "Can Delete Options"),
        ]

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return self.key




# Option Category Model
class OptionCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=150)
    config = models.CharField(max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "option_category"

# Option Choices Model


class OptionChoices(models.Model):
    category = models.ForeignKey(OptionCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    config = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.name} - ({self.category})"

    class Meta:
        db_table = "option_choice"
