from Scraper import validator
import gradio as gr

def sentence_builder(socialnetwork, username):
    if socialnetwork is None:
        return "Please select a social network."
        
    is_valid, message = validator.username(username)
    if not is_valid:
        return message
    
    return f"Hello... You are on {socialnetwork}, known by {username}"

interface = gr.Interface(
    sentence_builder,
    [        
        gr.Dropdown(
            ["instagram"], label="Social Network"
        ),
        gr.Textbox(label="username"),
    ],
    "text",
    theme="finlaymacklon/boxy_violet"
)

def launch_scraper_interface():   
    interface.launch()
