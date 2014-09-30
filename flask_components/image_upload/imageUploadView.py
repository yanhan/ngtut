import json

from flask import request, jsonify
import flask.views

from flask_components.image_upload.imageUploadModel import ImageUploadModel


class ImageUploadAdd(flask.views.MethodView):
    def post(self):
        args = json.loads(request.data)
        ImageUploadModel.insertFileIntoDb(args['imgFile'])
        return jsonify({ 'success': True })