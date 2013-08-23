# Angular.js tutorial

This is an introductory tutorial to Angular.js. It features a simple todo list application.

What might possibly make this tutorial special are:

- This is a "full stack" project. While emphasis is on front-end angular.js
code, there is a simple, working backend written in Python.
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

## Running Tests

From the top of the repository, go into the test folder.

    cd test

Then, run the tests with karma:

    karma test.conf.js
