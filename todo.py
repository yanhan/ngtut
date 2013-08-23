from flask import Flask

from todoView import TodoView

app = Flask(__name__)

app.add_url_rule('/', view_func=TodoView.as_view('todo_view'),
    methods=['GET'])

if __name__ == '__main__':
    app.run()
