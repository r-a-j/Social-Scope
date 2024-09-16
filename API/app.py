# app.py
from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from resources.extract_media import ExtractMedia

# Initialize Flask app
app = Flask(__name__, static_url_path="/data", static_folder="data")

# Enable CORS
CORS(app, resources={r"/extract-media": {"origins": ["http://localhost:4200"]}})

# Initialize Flask-RESTful API
api = Api(app)

# Add API resources
api.add_resource(ExtractMedia, "/extract-media")

if __name__ == "__main__":
    app.run(debug=True)
