import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from Scraper.src.InstagramDataDownloader import InstagramDataDownloader
from Scraper.src.Utility import Utility
from dotenv import load_dotenv


# Load environment variables
load_dotenv(dotenv_path="API\python.env")


INSTAGRAM_USERNAME = os.getenv("INSTAGRAM_USERNAME")
INSTAGRAM_PASSWORD = os.getenv("INSTAGRAM_PASSWORD")


app = Flask(__name__, static_url_path="/data", static_folder="../data")
CORS(app, resources={r"/extract-media": {"origins": "http://localhost:4200"}})
api = Api(app)


downloader = InstagramDataDownloader(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)


def extract_media(url):
    shortcode = Utility.extract_shortcode(url)
    if not shortcode:
        return {"error": "Invalid URL"}

    target_dir = downloader.save_single_post(shortcode)
    images = Utility.get_image_files(target_dir)
    videos = Utility.get_video_files(target_dir) or []

    images = [
        {
            "src": f"http://127.0.0.1:5000/{img}",
            "thumb": f"http://127.0.0.1:5000/{img}",
        }
        for img in images
    ]
    videos = [
        {
            "src": f"http://127.0.0.1:5000/{videos}",
            "thumb": images[0]["thumb"],
        }
    ] if videos else []

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
