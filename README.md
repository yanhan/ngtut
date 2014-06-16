# AngularJS tutorial

This repository contains the accompanying code for an introductory tutorial
to AngularJS that I've written at

http://blog.pangyanhan.com/posts/2013-08-27-ngtut.html

## System requirements

- Linux/UNIX like operating system
- Python 2.7
- virtualenv (for Python 2.7)

For running the unit tests, you will need:

- node.js (**0.10.15** is the version tested with this code)
- karma (**0.10.2** is the version tested with this code)
- phantomjs (**1.9.1** is the version tested with this code)

## Setting up

The setup.sh file is used to

- create the sqlite3 database
- create a virtualenv folder
- install the Python dependencies

To run it:

    ./setup.sh

## Running the program

First, run the setup script as outlined in the **Setting up** section above
in case you haven't.

Then, source the venv folder created by the setup script. Take note that
there is a **.** character (a period) right at the start:

    . venv/bin/activate

You should see a "(venv)" string beside your command prompt. This means that
we are currently inside the virtualenv (the virtualenv is inside the `venv`
folder). From now on, whenever you type `python` on the command prompt, you
will be using the Python interpreter inside the `venv/bin` folder instead of
the one installed globally on your system. The virtualenv also includes its
own `pip` and installs python packages to the virtualenv instead of installing
them globally.

Next, run:

    python todo.py

This will start the server application. You can now go to http://127.0.0.1:5000
to play around with it.


## Stopping the program

To stop, simply kill off the `python todo.py` using Ctrl-C.

To get out of the virtualenv, at the command line, run:

    deactivate


## Running Tests

In order to run the tests, you will need global installations of karma and
phantomjs. (You don't actually need phantomjs, but you will have to edit the
karma configuration file.)

You will require root privileges for the following commands.

To install karma 0.10.2,

    npm install -g karma@0.10.2

To install phantomjs 1.9.1,

    npm install -g phantomjs@1.9.1

To run the tests from the repository root:

    karma start test/test.conf.js

To run the tests at the test folder:

    cd test
    karma test.conf.js
