# login_manager.py
import instaloader


class LoginManager:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.loader = instaloader.Instaloader()


    def login(self):
        """Logs in to Instagram and loads the session."""
        try:
            self.loader.load_session_from_file(username=self.username, filename=self.username)
            if self.loader.test_login() != self.username:
                self.loader.login(self.username, self.password)
                self.loader.save_session_to_file(filename=self.username)
            print(f"Logged in as: {self.username}")
        except Exception as e:
            print(f"Error during login: {e}")


    def get_loader(self):
        return self.loader
