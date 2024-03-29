from django.contrib.auth.views import LoginView
from django.urls import path, include
from .views import *

from .forms import LoginForm
from . import views  # Import the views module from the same directory

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'account'


urlpatterns = [
    path('login/', LoginView.as_view(template_name='account/login.html', form_class=LoginForm), name='login'),

    # Users
    path('userLogin', UserLogin.as_view(), name='UserLogin'),
    path('getCurrentUser', GetCurrentUser.as_view(), name='GetCurrentUser'),
    path('getCurrentUser', GetCurrentUser.as_view(), name='GetCurrentUser'),

    # Users
    path('getUsers', GetUsers.as_view(), name='GetUsers'),
    path('addNewUser', AddNewUser.as_view(), name='AddNewUser'),
    path('updateUser/<int:id>/', UpdateUser.as_view(), name='UpdateUser'),
    path('deleteUser/<int:id>', DeleteUser.as_view(), name='DeleteUser'),
    path('changeUserPassword/<int:id>', ChangeUserPassword.as_view(), name='ChangeUserPassword'),

    # Tokens
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),


]
