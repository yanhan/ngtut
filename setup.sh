#!/bin/bash

# This script sets up the sqlite database for use
# It assumes that you have sqlite3 installed

if [ ! -f db.db ]; then
    sqlite3 db.db < setup/createtable.sql
fi

# This part uses virtualenv to create a localized python configuration

if [ ! -d venv  ]; then
    virtualenv venv/
fi

. venv/bin/activate

pip install -r requirements.txt
