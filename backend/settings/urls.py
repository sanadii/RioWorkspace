# Finance Urls
from django.urls import path
from .views import *

app_name = "settings"

urlpatterns = [
    path("getSettings", GetSettings.as_view(), name="GetSettings"),

    
    # Setting Options URLs
    path("getSettingOptions", GetSettingOptions.as_view(), name="GetSettingOptions"),
    path('updateSettingOption/<int:id>/', UpdateSettingOption.as_view(), name='UpdateSettingOption'),


    # Setting Options URLs
    # path("getSettingChoices", GetSettingChoices.as_view(), name="GetSettingChoices"),
    
    # Option Categories URLs
    path("getOptionCategories", GetOptionCategories.as_view(), name="GetOptionCategories"),
    path('addOptionCategory', AddOptionCategory.as_view(), name='AddOptionCategory'),
    path('updateOptionCategory/<int:id>', UpdateOptionCategory.as_view(), name='UpdateOptionCategory'),
    path('deleteOptionCategory/<int:id>', DeleteOptionCategory.as_view(), name='DeleteOptionCategory'),

    # Option Choices URLs
    path("getOptionChoices", GetOptionChoices.as_view(), name="GetOptionChoices"),
    path('addOptionChoice', AddOptionChoice.as_view(), name='AddOptionChoice'),
    path('updateOptionChoice/<int:id>', UpdateOptionChoice.as_view(), name='UpdateOptionChoice'),
    path('deleteOptionChoice/<int:id>', DeleteOptionChoice.as_view(), name='DeleteOptionChoice'),
]
