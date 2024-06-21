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

    images = Utility.get_image_files(folder_path)
    video = Utility.get_video_files(folder_path)

    return images, video, zip_path


def download_all(username, login_username, login_password):
    login_manager = LoginManager(login_username, login_password)
    login_manager.login()
    downloader = InstagramDataDownloader(login_manager)

    return downloader.download_all(username)


with gr.Blocks(
    theme="ParityError/Interstellar",
    title="Social Scope",
) as insta_scrape_gradio_zip:
    gr.Markdown(Utility.get_string("app_logo_url_markdown"))

    with gr.Tab("Post"):
        gr.Interface(
            fn=download_user_data,
            inputs=[
                gr.Text(label="Target Instagram Username", type="text"),
                gr.Text(label="Post Shortcode (optional)", type="text"),
                gr.Text(label="Login Username", type="text"),
                gr.Text(label="Login Password", type="password"),
            ],
            outputs=[
                gr.Gallery(
                    elem_id="gallery",
                    object_fit="contain",
                    height="auto",
                    interactive=False,
                ),
                gr.Video(height=640, width=360),
                gr.Files(label="Download", interactive=False),
            ],
            title="Download Single Post",
            description="Download Instagram stories, highlights, and posts as .zip files.",
        )

    with gr.Tab("All"):
        gr.Interface(
            fn=download_all,
            inputs=[
                gr.Text(label="Target Instagram Username", type="text"),
                gr.Text(label="Username", type="text"),
                gr.Text(label="Password", type="password"),
            ],
            outputs=gr.File(label="Download", interactive=False),
            title="Download All",
            description="Download Instagram stories, highlights, and posts as .zip files.",
        )


def launch_scraper_interface():
    insta_scrape_gradio_zip.launch()
