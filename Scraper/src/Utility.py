import shutil
import json
import os

class Utility:
    @staticmethod
    def zip_directory(folder_path, zip_name):
        """Creates a zip file of the given directory."""
        shutil.make_archive(zip_name, 'zip', folder_path)
        
        return f"{zip_name}.zip"
    
    def get_string(key):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        json_path = os.path.join(current_dir, "../strings.json")

        with open(json_path, "r") as file:
            jsonData = json.load(file)

        return jsonData[key]
