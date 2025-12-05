"""
Django settings for production (PythonAnywhere)
"""
from .settings import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Allowed hosts - à remplacer par votre domaine PythonAnywhere
ALLOWED_HOSTS = ['votre-username.pythonanywhere.com']

# Secret key depuis variable d'environnement
SECRET_KEY = os.environ.get('SECRET_KEY', SECRET_KEY)

# Static files configuration pour PythonAnywhere
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CORS - restreindre en production
CORS_ALLOWED_ORIGINS = [
    "https://votre-username.pythonanywhere.com",
]

# Database - utiliser SQLite pour PythonAnywhere gratuit
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

