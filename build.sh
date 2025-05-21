#!/usr/bin/env bash

# Exit on error
set -o errexit

# Collect static files
python manage.py collectstatic --noinput

# Run database migrations
python manage.py migrate
