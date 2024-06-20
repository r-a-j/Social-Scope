# main.py
import gradio as gr

from Scraper.src.Utility import Utility
from Scraper.src.LoginManager import LoginManager
from Scraper.src.InstagramDataDownloader import InstagramDataDownloader


def download_user_data(target_username, shortcode, login_username, login_password):
    login_manager = LoginManager(login_username, login_password)
    login_manager.login()
    downloader = InstagramDataDownloader(login_manager)

    if shortcode:
        folder_path = downloader.save_single_post(shortcode)
    else:
        folder_path = downloader.download_all(target_username)

    zip_name = folder_path.stem
    zip_path = Utility.zip_directory(folder_path, zip_name)
    
    return zip_path


def download_all(username, login_username, login_password):
    login_manager = LoginManager(login_username, login_password)
    login_manager.login()
    downloader = InstagramDataDownloader(login_manager)
    
    return downloader.download_all(username)


with gr.Blocks(theme='finlaymacklon/boxy_violet') as insta_scrape_gradio_zip:
    with gr.Tab("Post"):
        gr.Interface(
            fn=download_user_data,
            inputs=[
                gr.Textbox(label="Target Instagram Username"),
                gr.Textbox(label="Post Shortcode (optional)"),
                gr.Textbox(label="Login Username"),
                gr.Textbox(label="Login Password")
            ],
            outputs=gr.File(label="Download", interactive=False),
            title="Social Scope",
            description="Download Instagram stories, highlights, and posts as .zip files."
        )

    with gr.Tab("All"):
        gr.Interface(
            fn=download_all,
            inputs=[
                gr.Textbox(label="Target Instagram Username"),
                gr.Textbox(label="Username"),
                gr.Textbox(label="Password")
            ],
            outputs=gr.File(label="Download", interactive=False),
            title="Instagram Data Downloader",
            description="Download Instagram stories, highlights, and posts as .zip files."
        )


def launch_scraper_interface():
    insta_scrape_gradio_zip.launch()
