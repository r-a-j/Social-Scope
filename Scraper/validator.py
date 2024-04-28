import re

def username(s):
    
    pattern = re.compile(r'^[a-zA-Z0-9._]{3,30}$')
    if pattern.match(s):
        return True, ""
    else:
        return False, "Username is invalid."