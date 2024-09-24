# resources/process_image.py

from flask_restful import Resource
from flask import request
import os

from comfyui_utils.processor import process_image_with_comfyui

class ProcessImage(Resource):
    def post(self):
        data = request.get_json()
        image_url = data.get("image_url")
        if not image_url:
            return {"error": "Image URL is required"}, 400

        # Extract the image path from the URL
        image_path = self.get_image_path_from_url(image_url)
        if not image_path:
            return {"error": "Invalid image URL"}, 400
        if not os.path.exists(image_path):
            return {"error": f"Image not found at path: {image_path}"}, 404

        # Compute the absolute path to the workflow file
        workflow_file = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'workflows', 'workflow_api_quill.json'))

        # Process the image with ComfyUI
        try:
            processed_image_paths = process_image_with_comfyui(image_path, workflow_file)
        except Exception as e:
            return {"error": str(e)}, 500

        # Generate URLs for the processed images
        processed_image_urls = []
        for proc_img_path in processed_image_paths:
            relative_path = os.path.relpath(proc_img_path, 'data').replace("\\", "/")
            processed_image_urls.append({
                'src': f"http://127.0.0.1:5000/data/{relative_path}",
                'thumb': f"http://127.0.0.1:5000/data/{relative_path}",
            })

        return {"processed_images": processed_image_urls}, 200

    def get_image_path_from_url(self, image_url):
        """
        Converts the image URL back to a file path.
        Assumes that the URL is in the format 'http://127.0.0.1:5000/data/<relative_path>'
        """
        # Remove the base URL and static URL path
        base_url = "http://127.0.0.1:5000/data/"
        if image_url.startswith(base_url):
            relative_path = image_url[len(base_url):]
            # Convert forward slashes to the OS-specific separator
            relative_path = relative_path.replace("/", os.sep)
            # Construct the full file path
            image_path = os.path.abspath(os.path.join('data', relative_path))
            
            return image_path
        else:
            return None
