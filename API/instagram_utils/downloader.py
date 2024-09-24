# instagram_utils/downloader.py
import os
from dotenv import load_dotenv

from Scraper.src.InstagramDataDownloader import InstagramDataDownloader
from Scraper.src.Utility import Utility

load_dotenv(dotenv_path="API/python.env")

# Initialize Instagram downloader
INSTAGRAM_USERNAME = os.getenv("INSTAGRAM_USERNAME")
INSTAGRAM_PASSWORD = os.getenv("INSTAGRAM_PASSWORD")
downloader = InstagramDataDownloader(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)

def extract_media(url):
    shortcode = Utility.extract_shortcode(url)
    if not shortcode:
        return {"error": "Invalid URL"}
    target_dir = downloader.save_single_post(shortcode)
    # Get image and video files
    images = Utility.get_image_files(target_dir)
    videos = Utility.get_video_files(target_dir) or []
    # Prepare image URLs
    image_dict = {
        os.path.splitext(img)[0]: f"http://127.0.0.1:5000/{img}" for img in images
    }
    
    videos = [
        {
            "src": f"http://127.0.0.1:5000/{video}",
            # Try to match the base name of the video with the image for the thumbnail
            "thumb": image_dict.get(
                os.path.splitext(video)[0], f"http://127.0.0.1:5000/{video}"
            ),
        }
        for video in videos
    ]
    
    images = [
        {
            "src": f"http://127.0.0.1:5000/{img}",
            "thumb": f"http://127.0.0.1:5000/{img}",
        }
        for img in images
    ]
    
    return {"images": images, "videos": videos}
