import os
import instaloader
from Scraper.src.GradioUtility import GradioUtility


class LoginManager:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.loader = instaloader.Instaloader()


    def login(self):
        """Logs in to Instagram and loads the session."""
        try:
            if os.path.exists(self.username):
                self.loader.load_session_from_file(username=self.username, filename=self.username)
                if self.loader.test_login() == self.username:
                    GradioUtility.show_info(f"Logged in as: {self.username} using saved session")
                    return
                else:
                    GradioUtility.show_warning("Session file found but login test failed. Re-logging in.")
            else:
                GradioUtility.show_warning("No session file found. Logging in with username and password.")
                
            self.loader.login(self.username, self.password)
            self.loader.save_session_to_file(filename=self.username)
            GradioUtility.show_info(f"Logged in as: {self.username} and session saved to file")
        except Exception as e:
            GradioUtility.show_error(f"Error during login: {e}")


    def get_loader(self):
        return self.loader
