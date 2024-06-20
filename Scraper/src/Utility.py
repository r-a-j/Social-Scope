import shutil


class Utility:
    @staticmethod
    def zip_directory(folder_path, zip_name):
        """Creates a zip file of the given directory."""
        shutil.make_archive(zip_name, 'zip', folder_path)
        
        return f"{zip_name}.zip"
