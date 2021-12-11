@echo off

set FLASK_APP=robot_maker
for /F %%w in ('pipenv --venv') do call %%w\Scripts\activate

@echo on

flask run -h 0.0.0.0

