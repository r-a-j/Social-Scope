from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/extract-media": {"origins": "http://localhost:4200"}})
api = Api(app)


def extract_media(url):
    # Your existing logic to extract and save images and videos locally
    # For demonstration, using dummy data
    images = [
        "https://images.unsplash.com/photo-1537886079430-486164575c54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c747db3353a34b312d05786f47930d3&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1537886194634-e6b923f92ff1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9eb2726071e58c1b0a430a75b1047525&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1537886243959-0b504cf58aa2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1171ce40e6e68e663c3399a67a915913&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1537886492139-052c27acbfee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=664282a4bd8b8a69cc860420214df3e7&auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1537886464786-8a0d500b0da6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49984d393482456ea5484c3482cc52a9&auto=format&fit=crop&w=600&q=60",
    ]
    videos = [
        "https://videos.pexels.com/video-files/20759098/20759098-hd_1080_1920_30fps.mp4",
        "https://videos.pexels.com/video-files/27278853/12109682_1080_1922_30fps.mp4",
        "https://videos.pexels.com/video-files/20337849/20337849-uhd_1440_2560_24fps.mp4",
        "https://videos.pexels.com/video-files/27333464/12120016_1440_2560_30fps.mp4",
        "https://videos.pexels.com/video-files/26738506/11997977_1440_2560_30fps.mp4",
    ]

    images = [{"src": img, "thumb": img} for img in images]
    videos = [
        {"src": vid, "thumb": images[i % len(images)]["thumb"]}
        for i, vid in enumerate(videos)
    ]

    return {"images": images, "videos": videos}


class ExtractMedia(Resource):
    def post(self):
        data = request.get_json()
        url = data.get("url")
        if not url:
            return {"error": "URL is required"}, 400

        media = extract_media(url)
        return media, 200


api.add_resource(ExtractMedia, "/extract-media")

if __name__ == "__main__":
    app.run(debug=True)
