from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView

# Apps
from apps.settings.models import OptionCategory, OptionChoices
from apps.settings.serializers import OptionCategorySerializer, OptionChoicesSerializer


class GetSettingOptions(APIView):
    def get(self, request, format=None):
        option_categories = OptionCategory.objects.all()
        
        data = {}
        
        for category in option_categories:
            category_serializer = OptionCategorySerializer(category)
            choices = OptionChoices.objects.filter(category=category)
            choice_serializer = OptionChoicesSerializer(choices, many=True)
            data[category_serializer.data['name']] = choice_serializer.data
        
        return Response({'data': data})


# Option Categories
class GetOptionCategories(APIView):
    def get(self, request, format=None):
        categories = OptionCategory.objects.all()  # Adjust the query as needed
        serializer = OptionCategorySerializer(categories, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class AddOptionCategory(CreateAPIView):
    queryset = OptionCategory.objects.all()
    serializer_class = OptionCategorySerializer

class UpdateOptionCategory(UpdateAPIView):
    queryset = OptionCategory.objects.all()
    serializer_class = OptionCategorySerializer

class DeleteOptionCategory(DestroyAPIView):
    queryset = OptionCategory.objects.all()
    serializer_class = OptionCategorySerializer

# Option Choices
class GetOptionChoices(APIView):
    def get(self, request, format=None):
        choices = OptionChoices.objects.all()  # Adjust the query as needed
        serializer = OptionChoicesSerializer(choices, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class AddOptionChoice(CreateAPIView):
    queryset = OptionChoices.objects.all()
    serializer_class = OptionChoicesSerializer

class UpdateOptionChoice(UpdateAPIView):
    queryset = OptionChoices.objects.all()
    serializer_class = OptionChoicesSerializer

class DeleteOptionChoice(DestroyAPIView):
    queryset = OptionChoices.objects.all()
    serializer_class = OptionChoicesSerializer
