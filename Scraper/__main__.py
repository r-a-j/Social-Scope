import gradio as gr
import re

def validate_username(username):
    
    if not username:
        return False, "Please input a username."
    
    if len(username) < 3 or len(username) > 30:
        return False, "Invalid username (min 3 & max 30 characters)."
        
    if not re.match("^[a-zA-Z0-9.]*$", username):
        return False, "Username can only contain letters, numbers, and periods."
        
    if any(char in r"""!"#$%&'()*+,-/:;<=>?@[\]^_`{|}~""" for char in username):
        return False, "Username can't contain symbols or punctuation marks."
    
    return True, "Username is valid."

def sentence_builder(socialnetwork, username):
    
    if socialnetwork is None:
        return "Please select a social network."
        
    is_valid, message = validate_username(username)
    if not is_valid:
        return message
    
    return f"Hello... You are on {socialnetwork}, known by {username}"

scraper = gr.Interface(
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

def main():
    scraper.launch()