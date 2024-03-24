from rest_framework import serializers
from settings.models import SettingOption, OptionCategory, OptionChoices

class SettingOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SettingOption
        fields = ['id', 'name', 'value']


class OptionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionCategory
        fields = '__all__'

class OptionChoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionChoices
        fields = '__all__'
