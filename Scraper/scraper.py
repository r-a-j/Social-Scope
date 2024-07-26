# main.py
import gradio as gr
from Scraper.src.Utility import Utility
from Scraper.src.LoginManager import LoginManager
from Scraper.src.InstagramDataDownloader import InstagramDataDownloader
from Scraper.src.GradioUtility import GradioUtility


def download_user_data(url):
    shortcode = Utility.extract_shortcode(url)
    downloader = InstagramDataDownloader()
    
    if shortcode:
        folder_path = downloader.save_single_post(shortcode)
    else:
        GradioUtility.show_error(f"Please provide a valid link")

    zip_name = folder_path.stem
    zip_path = Utility.zip_directory(folder_path, zip_name)

    images = Utility.get_image_files(folder_path)
    video = Utility.get_video_files(folder_path)

    return images, video, zip_path


def download_all(username):
    downloader = InstagramDataDownloader()

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
                gr.Text(label="Post Link", type="text")
            ],
            outputs=[
                gr.Gallery(
                    label="Images",
                    elem_id="gallery",
                    object_fit="contain",
                    height="auto",
                    interactive=False,
                ),
                gr.Video(label="Video", height=640, width=360),
                gr.Files(label=".Zip Download", interactive=False),
            ],
            title=Utility.get_string("download_single_post_title"),
            description=Utility.get_string("download_single_post_description"),
        )

    with gr.Tab("All Posts"):
        gr.Interface(
            fn=download_all,
            inputs=[
                gr.Text(label="Target Instagram Username", type="text"),
            ],
            outputs=gr.File(label="Download", interactive=False),
            title=Utility.get_string("download_all_post_title"),
            description=Utility.get_string("download_all_post_description"),
        )
        
    with gr.Tab("Highlights"):
        gr.Interface(
            fn=download_all,
            inputs=[
                gr.Text(label="Target Instagram Username", type="text"),
            ],
            outputs=gr.File(label="Download", interactive=False),
            title=Utility.get_string("download_all_post_title"),
            description=Utility.get_string("download_all_post_description"),
        )
        
    with gr.Tab("Today's Story"):
        gr.Interface(
            fn=download_all,
            inputs=[
                gr.Text(label="Target Instagram Username", type="text"),
            ],
            outputs=gr.File(label="Download", interactive=False),
            title=Utility.get_string("download_all_post_title"),
            description=Utility.get_string("download_all_post_description"),
        )


def launch_scraper_interface():
    insta_scrape_gradio_zip.launch()
