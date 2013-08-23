from flask import render_template

import flask.views

class TodoView(flask.views.MethodView):
    def get(self):
        return render_template('main.html')
