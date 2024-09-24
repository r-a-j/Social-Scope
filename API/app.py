# app.py
import sys
import os

# Add the root directory (SocialScope) to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from resources.extract_media import ExtractMedia
from resources.process_image import ProcessImage

# Initialize Flask app
app = Flask(__name__, static_url_path="/data", static_folder="../data")

# Enable CORS for all routes and specific origin
CORS(app, resources={r"/*": {"origins": ["http://localhost:4200"]}})

# Initialize Flask-RESTful API
api = Api(app)

# Add API resources
api.add_resource(ExtractMedia, "/extract-media")
api.add_resource(ProcessImage, "/process-image")

if __name__ == "__main__":
    app.run(debug=True)
