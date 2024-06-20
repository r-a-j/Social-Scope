import instaloader
from Scraper.src.DirectoryManager import DirectoryManager
from Scraper.src.Utility import Utility


class InstagramDataDownloader:
    def __init__(self, login_manager):
        self.loader = login_manager.get_loader()


    def save_posts(self, username):
        """Saves all posts from a user's profile."""
        _, _, _, posts_dir = DirectoryManager.create_directory_structure(username)
        profile = instaloader.Profile.from_username(self.loader.context, username)

        for post in profile.get_posts():
            self.loader.download_post(post, target=posts_dir)

        return posts_dir


    def save_single_post(self, shortcode):
        """Saves a single post given its shortcode."""
        post = instaloader.Post.from_shortcode(self.loader.context, shortcode)
        target_dir = DirectoryManager.BASE_DIR / f"{post.profile}_{shortcode}"
        target_dir.mkdir(parents=True, exist_ok=True)

        self.loader.download_post(post, target=target_dir)
        return target_dir


    def save_story_highlights(self, username):
        """Saves the story highlights of a user."""
        _, highlights_dir, stories_dir, _ = DirectoryManager.create_directory_structure(username)
        profile = self.loader.check_profile_id(username)
        user_id = profile.userid

        # Save current story
        self.loader.download_stories(userids=[user_id], filename_target=stories_dir)

        # Save all highlights
        for highlight in self.loader.get_highlights(profile):
            for item in highlight.get_items():
                highlight_dir = highlights_dir / highlight.title
                highlight_dir.mkdir(parents=True, exist_ok=True)
                self.loader.download_storyitem(item, target=highlight_dir)

        return highlights_dir


    def download_all(self, username):
        """Downloads all data (stories, highlights, posts) for a user and zips it."""
        user_dir, _, _, _ = DirectoryManager.create_directory_structure(username)
        self.save_posts(username)
        self.save_story_highlights(username)
        zip_path = Utility.zip_directory(user_dir, user_dir.with_suffix('.zip').stem)
        return zip_path
