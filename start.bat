@echo off
call "%CD%\venv\Scripts\activate.bat"
cd backend
start cmd /c py manage.py runserver
cd ..
cd frontend
start cmd /c yarn start
