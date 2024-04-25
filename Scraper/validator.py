import re

def username(username):
    
    if not username:
        return False, "Please input a username."
    
    if len(username) < 3 or len(username) > 30:
        return False, "Invalid username (min 3 & max 30 characters)."
        
    if not re.match("^[a-zA-Z0-9.]*$", username):
        return False, "Username can only contain letters, numbers, and periods."
        
    if any(char in r"""!"#$%&'()*+,-/:;<=>?@[\]^_`{|}~""" for char in username):
        return False, "Username can't contain symbols or punctuation marks."
    
    return True, "Username is valid."