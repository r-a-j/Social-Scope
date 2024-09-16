# resources/extract_media.py
from flask_restful import Resource
from flask import request

from instagram_utils.downloader import extract_media

class ExtractMedia(Resource):
    def post(self):
        data = request.get_json()
        url = data.get("url")
        if not url:
            return {"error": "URL is required"}, 400

        media = extract_media(url)
        return media, 200
