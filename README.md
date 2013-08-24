# Angular.js tutorial

This is an introductory tutorial to Angular.js. It features a simple todo list application.

What might possibly make this tutorial special are:

- This is a "full stack" project. While emphasis is on front-end angular.js
code, there is a simple, working backend written in Python (using the Flask
framework).
- Working unit tests are included. However, because node.js is still pre 1.0,
the unit tests may not run properly for every version of node.js / karma.
In light of this, I've listed down the versions of the various pieces of
software that work on my system in the **System requirements** section below.

## System requirements

- Linux/UNIX like operating system
- Python 2.7
- virtualenv (for Python 2.7)
- sqlite3

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

In order to run the tests, you will need global installations of karma and
phantomjs. (You don't actually need phantomjs, but you will have to edit the
karma configuration file.)

You will require root privileges for the following commands.

To install karma 0.10.2,

    npm install -g karma@0.10.2

To install phantomjs 1.9.1,

    npm install -g phantomjs@1.9.1

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

From the top of the repository, go into the test folder.

    cd test

Then, run the tests with karma:

    karma test.conf.js
