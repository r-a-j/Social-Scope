import shutil
import json
import os
import re


class Utility:
    @staticmethod
    def zip_directory(folder_path, zip_name):
        """Creates a zip file of the given directory."""
        shutil.make_archive(zip_name, "zip", folder_path)

        return f"{zip_name}.zip"

    @staticmethod
    def get_string(key):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        json_path = os.path.join(current_dir, "../strings.json")

        with open(json_path, "r") as file:
            jsonData = json.load(file)

        return jsonData[key]

    @staticmethod
    def get_files_by_extension(folder_path, extensions):
        """Returns all files with the given extensions inside the folder path."""
        files_list = []
        for root, _, files in os.walk(folder_path):
            for file in files:
                if file.lower().endswith(extensions):
                    files_list.append(os.path.join(root, file))

        return files_list

    @staticmethod
    def get_image_files(folder_path):
        """Returns all images inside the folder path."""
        image_extensions = (".png", ".jpg", ".jpeg", ".gif", ".bmp")

        return Utility.get_files_by_extension(folder_path, image_extensions)

    @staticmethod
    def get_file_by_extension(folder_path, extensions):
        """Returns a list of files with the given extensions inside the folder path."""
        matching_files = []
        for root, _, files in os.walk(folder_path):
            for file in files:
                if file.lower().endswith(extensions):
                    matching_files.append(os.path.join(root, file))
        return matching_files

    @staticmethod
    def get_video_files(folder_path):
        """Returns all videos inside the folder path."""
        video_extensions = (".mp4", ".mov", ".avi")

        return Utility.get_file_by_extension(folder_path, video_extensions)

    @staticmethod
    def extract_shortcode(url: str) -> str:
        """Extracts the shortcode from the given Instagram URL."""
        pattern = r"^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([\w-]+)"
        match = re.search(pattern, url)

        return match.group(1) if match else None
