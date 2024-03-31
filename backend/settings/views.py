from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView

# Apps
from settings.models import SettingOption, OptionCategory, OptionChoices
from settings.serializers import SettingOptionSerializer, OptionCategorySerializer, OptionChoicesSerializer


class GetSettingOptions(APIView):
    def get(self, request, format=None):
        options = SettingOption.objects.all()
        serializer = SettingOptionSerializer(options, many=True)
        return Response({'data': serializer.data})



class GetSettings(APIView):
    def get(self, request, format=None):
        # Get all setting options and serialize them
        options = SettingOption.objects.all()
        options_serializer = SettingOptionSerializer(options, many=True)

        # Get all option categories
        option_categories = OptionCategory.objects.all()
        
        # Initialize the data dictionary
        data = {'setting_options': options_serializer.data}

        # Loop through each category and serialize the choices
        for category in option_categories:
            category_serializer = OptionCategorySerializer(category)
            option_choices = OptionChoices.objects.filter(category=category)
            choice_serializer = OptionChoicesSerializer(option_choices, many=True)
            
            # Add the choices to the data dictionary
            data.setdefault('setting_choices', {}).update({category_serializer.data['value']: choice_serializer.data})

        # Return the response
        return Response({'data': data})



class UpdateSettingOption(APIView):
    def post(self, request, id, format=None):
        try:
            option = SettingOption.objects.get(id=id)
        except SettingOption.DoesNotExist:
            return Response({'error': 'Option not found'}, status=404)

        serializer = SettingOptionSerializer(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Option updated successfully'})
        return Response(serializer.errors, status=400)


# class GetSettingChoices(APIView):
#     def get(self, request, format=None):
#         option_categories = OptionCategory.objects.all()

#         data = {}

#         for category in option_categories:
#             category_serializer = OptionCategorySerializer(category)
#             choices = OptionChoices.objects.filter(category=category)
#             choice_serializer = OptionChoicesSerializer(choices, many=True)
#             data[category_serializer.data['name']] = choice_serializer.data

#         return Response({'data': data})


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
