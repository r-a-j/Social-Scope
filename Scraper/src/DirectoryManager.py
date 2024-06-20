from pathlib import Path
from datetime import datetime


class DirectoryManager:
    BASE_DIR = Path('./data/raw')


    @classmethod
    def create_directory_structure(cls, username):
        """Creates the directory structure for storing Instagram data."""
        user_dir = cls.BASE_DIR / username
        highlights_dir = user_dir / 'highlights'
        stories_dir = user_dir / f"{datetime.now().strftime('%Y%m%d')}_story"
        posts_dir = user_dir / 'posts'

        highlights_dir.mkdir(parents=True, exist_ok=True)
        stories_dir.mkdir(parents=True, exist_ok=True)
        posts_dir.mkdir(parents=True, exist_ok=True)

        return user_dir, highlights_dir, stories_dir, posts_dir
