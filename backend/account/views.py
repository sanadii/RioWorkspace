from django.contrib.auth.models import Group
from django.http import JsonResponse
from account.models import User
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import UserSerializer, UserLoginSerializer
from rest_framework import status
from rest_framework.response import Response

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.exceptions import ObjectDoesNotExist

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from django.views import View
from rest_framework.views import APIView
from django.http import HttpResponse



class UserLogin(APIView):
    permission_classes = [AllowAny]

    @method_decorator(csrf_exempt)
    def post(self, request):
        print("Inside UserLogin view")
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()

        if user is None:
            return Response({'error': 'User not found!'}, status=status.HTTP_404_NOT_FOUND)
        if not user.check_password(password):
            return Response({'error': 'Incorrect password!'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access_token = str(AccessToken().for_user(user))

        # Create cookies and add them to the response
        response = Response({
            'status': 'success',
            'refresh_token': str(refresh),
            'access_token': access_token,
        })

        # Set the cookies with the tokens
        response.set_cookie('first_name', 'John')  # Example cookie
        response.set_cookie('team', 'barcelona')    # Example cookie

        response.set_cookie('test_cookie', 'test_value')
        response.set_cookie('test_cookie', value='test_value', max_age=None, expires=None, path='/', domain=None, secure=None, httponly=False, samesite=None)

        print("Cookies set:", response.cookies)

        return response




class ChangeUserPassword(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'error': 'كلمة المرور السابقة غير صحيحة.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'status': 'password set'}, status=status.HTTP_200_OK)


class UserProfileUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, format=None):
        user = request.user  # Get the authenticated user directly from the request due to the middleware
        serializer = UserSerializer(user, data=request.data, partial=True) # Update existing instance
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "User profile updated successfully"})
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

from utils.utils_views import CustomPagination

class GetUsers(APIView):
    def get(self, request, *args, **kwargs):
        user_data = User.objects.all()
        paginator = CustomPagination()
        paginated_users = paginator.paginate_queryset(user_data, request)

        # Passing context with request to the serializer
        context = {"request": request}
        data_serializer = UserSerializer(paginated_users, many=True, context=context)

        return paginator.get_paginated_response(data_serializer.data)

class GetCurrentUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = UserSerializer(user).data

        return Response({"data": user_data, "code": 200})
    
class GetModeratorUsers(APIView):
    def get(self, request):
        # Get the group object for 'Moderator'
        group = Group.objects.get(name='CampaignModerator')

        # Get the users in the group 'Moderator' - ID is 14
        moderators = group.user_set.all()

        # Serialize the data
        data_serializer = UserSerializer(moderators, many=True)

        return Response({"data": data_serializer.data, "code": 200})

class GetCampaignModerators(APIView):
    def get(self, request):
        try:
            # Get the group object where name is 'campaignModerator' (or 'Editor' if it's the correct name)
            group = Group.objects.get(name='moderator')  # Update 'campaignModerator' if needed
            
            # Get the users in the group with name 'campaignModerator'
            moderators = group.user_set.all()
            
            # Serialize the data
            data_serializer = UserSerializer(moderators, many=True)

            return Response({"data": data_serializer.data, "code": 200})
        except ObjectDoesNotExist:
            return Response({"data": [], "code": 200, "message": "No moderators found."})
    
class AddNewUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            new_user = serializer.save()
            if 'password' in request.data:
                password = request.data['password']
                new_user.set_password(password)
                new_user.save()
            return Response({"data": UserSerializer(new_user, context={'request': request}).data, "count": 1, "code": 200}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUser(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        if 'password' in request.data:
            if request.user != user and not request.user.is_superuser:
                return Response({"error": "You do not have permission to change this user's password."}, status=403)
            password = request.data.pop('password')
            user.set_password(password)

        serializer = UserSerializer(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "count": 0, "code": 200})
        return Response(serializer.errors, status=400)

class DeleteUser(APIView):
    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            # user.delete(user=request.user) #This to use deleted by in TrackModel
            user.delete()
            return JsonResponse({"data": "User deleted successfully", "count": 1, "code": 200}, safe=False)
        except User.DoesNotExist:
            return JsonResponse({"data": "User not found", "count": 0, "code": 404}, safe=False)


# Group Model
class GetGroups(APIView):

    def get(self, request):
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)

        # Fetch all distinct categories and transform to desired format
        raw_categories = dict(GroupCategories.choices)
        categories = [{'id': key, 'name': value} for key, value in raw_categories.items()]

        # Return the response in the desired format
        return Response({
            "code": 200,
            "data": {
                "groups": serializer.data,
                "categories": categories
            }
        })

class AddNewGroup(APIView):
    def post(self, request):
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateGroup(APIView):
    def patch(self, request, id):
        try:
            group = Group.objects.get(id=id)
        except Group.DoesNotExist:
            return Response({"data": "Group not found", "code": 404}, status=status.HTTP_404_NOT_FOUND)

        serializer = GroupSerializer(group, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteGroup(APIView):
    def delete(self, request, id):
        try:
            group = Group.objects.get(id=id)
            group.delete()
            return JsonResponse({"data": "Group deleted successfully", "count": 1, "code": 200}, safe=False)
        except Group.DoesNotExist:
            return JsonResponse({"data": "Group not found", "count": 0, "code": 404}, safe=False)


