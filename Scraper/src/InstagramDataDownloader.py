import instaloader
import time
from Scraper.src.DirectoryManager import DirectoryManager
from Scraper.src.Utility import Utility


class InstagramDataDownloader:
    SESSION_DIR = "session"
    
    def __init__(self, username, password):
        if not username or not password:
            raise ValueError("Username and password must be provided.")
        self.username = username
        self.password = password
        self.loader = instaloader.Instaloader(download_video_thumbnails=True, compress_json=True)
        self.session_file_path = f"{self.SESSION_DIR}/{self.username}"
        self._login()

    def _login(self):
        try:
            # Attempt to load session
            self.loader.load_session_from_file(username=self.username, filename=self.session_file_path)
            print(f"Session loaded for {self.username}")
            
        except FileNotFoundError:
            # If session file not found, log in with username and password
            print(f"No session file found for {self.username}. Logging in with username and password.")
            self.loader.context.log("Login required")
            self.loader.login(self.username, self.password)
            self.loader.save_session_to_file(filename=self.session_file_path)
            
        except instaloader.exceptions.BadCredentialsException as e:
            print(f"Invalid session file for {self.username}. Logging in with username and password.")
            self.loader.context.log("Login required")
            self.loader.login(self.username, self.password)
            self.loader.save_session_to_file(filename=self.session_file_path)
            
        except Exception as e:
            print(f"An error occurred during login: {e}")
            raise e

    def _handle_rate_limit(self, response):
        if response.status_code == 429:
            print("Rate limit reached. Retrying after delay.")
            time.sleep(600)  # Wait for 10 minutes before retrying
            return True
        return False

    def save_posts(self, username):
        """Saves all posts from a user's profile."""
        _, _, _, posts_dir = DirectoryManager.create_directory_structure(username)
        profile = instaloader.Profile.from_username(self.loader.context, username)

        for post in profile.get_posts():
            while True:
                try:
                    self.loader.download_post(post, target=posts_dir)
                    break
                except instaloader.exceptions.ConnectionException as e:
                    if not self._handle_rate_limit(e):
                        raise e
                time.sleep(2)  # Add delay to avoid rate limiting

        return posts_dir

    def save_single_post(self, shortcode):
        """Saves a single post given its shortcode."""
        while True:
            try:
                post = instaloader.Post.from_shortcode(self.loader.context, shortcode)
                break
            except instaloader.exceptions.ConnectionException as e:
                if not self._handle_rate_limit(e):
                    raise e
        
        target_dir = DirectoryManager.BASE_DIR / f"{post.profile}_{shortcode}"
        target_dir.mkdir(parents=True, exist_ok=True)

        while True:
            try:
                self.loader.download_post(post, target=target_dir)
                break
            except instaloader.exceptions.ConnectionException as e:
                if not self._handle_rate_limit(e):
                    raise e
        
        return target_dir

    def save_story_highlights(self, username):
        """Saves the story highlights of a user."""
        _, highlights_dir, stories_dir, _ = DirectoryManager.create_directory_structure(username)
        profile = self.loader.check_profile_id(username)
        user_id = profile.userid

        # Save current story
        while True:
            try:
                self.loader.download_stories(userids=[user_id], filename_target=stories_dir)
                break
            except instaloader.exceptions.ConnectionException as e:
                if not self._handle_rate_limit(e):
                    raise e

        # Save all highlights
        for highlight in self.loader.get_highlights(profile):
            for item in highlight.get_items():
                highlight_dir = highlights_dir / highlight.title
                highlight_dir.mkdir(parents=True, exist_ok=True)
                while True:
                    try:
                        self.loader.download_storyitem(item, target=highlight_dir)
                        break
                    except instaloader.exceptions.ConnectionException as e:
                        if not self._handle_rate_limit(e):
                            raise e

        return highlights_dir

    def download_all(self, username):
        """Downloads all data (stories, highlights, posts) for a user and zips it."""
        user_dir, _, _, _ = DirectoryManager.create_directory_structure(username)
        self.save_posts(username)
        self.save_story_highlights(username)
        zip_path = Utility.zip_directory(user_dir, user_dir.with_suffix('.zip').stem)
        return zip_path
