from flask import Flask

from todoView import TodoView, TodoAdd, TodoRetrieve
from flask_components.image_upload.imageUploadView import ImageUploadAdd

app = Flask(__name__)

app.add_url_rule('/', view_func=TodoView.as_view('todo_view'),
    methods=['GET'])

app.add_url_rule('/todoAdd', view_func=TodoAdd.as_view('todo_add'),
    methods=['POST'])

app.add_url_rule('/todoRetrieve/<int:n>',
    view_func=TodoRetrieve.as_view('todo_retrieve'), methods=['GET'])

app.add_url_rule('/imageUpload', view_func=ImageUploadAdd.as_view('image_add'),
     methods=['POST'])

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
