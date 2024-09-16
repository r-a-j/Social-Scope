# instagram_utils/downloader.py
import os
from dotenv import load_dotenv

from Scraper.src.InstagramDataDownloader import InstagramDataDownloader
from Scraper.src.Utility import Utility
from comfyui_utils.processor import process_image_with_comfyui

# Load environment variables
load_dotenv(dotenv_path="API/python.env")

# Initialize Instagram downloader
INSTAGRAM_USERNAME = os.getenv("INSTAGRAM_USERNAME")
INSTAGRAM_PASSWORD = os.getenv("INSTAGRAM_PASSWORD")
downloader = InstagramDataDownloader(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)

def extract_media(url):
    """
    Extracts media from an Instagram post URL, processes images with ComfyUI, and returns media URLs.
    """
    # Extract shortcode from URL
    shortcode = Utility.extract_shortcode(url)
    if not shortcode:
        return {"error": "Invalid URL"}, 400

    # Download media associated with the shortcode
    target_dir = downloader.save_single_post(shortcode)

    # Get image and video files
    images = Utility.get_image_files(target_dir)
    videos = Utility.get_video_files(target_dir) or []

    # Prepare image URLs
    image_urls = []
    for img in images:
        image_path = os.path.join(target_dir, img)
        # Process the image with ComfyUI
        processed_image_paths = process_image_with_comfyui(image_path, 'workflows/workflow.json')
        # Generate URLs for the processed images
        for proc_img_path in processed_image_paths:
            relative_path = os.path.relpath(proc_img_path, 'data')
            image_urls.append({
                'src': f"http://127.0.0.1:5000/{relative_path}",
                'thumb': f"http://127.0.0.1:5000/{relative_path}",
            })

    # Prepare video URLs (if any)
    video_urls = []
    for video in videos:
        video_path = os.path.join(target_dir, video)
        relative_path = os.path.relpath(video_path, 'data')
        video_urls.append({
            'src': f"http://127.0.0.1:5000/{relative_path}",
            'thumb': f"http://127.0.0.1:5000/{relative_path}",
        })

    return {"images": image_urls, "videos": video_urls}
