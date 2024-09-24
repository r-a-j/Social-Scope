# comfyui_utils/processor.py

import json
import uuid
import os
import urllib.request
from websocket import create_connection
from PIL import Image
import io

# Server configuration
SERVER_ADDRESS = "127.0.0.1:8188"
API_URL = f"http://{SERVER_ADDRESS}"
WS_URL = f"ws://{SERVER_ADDRESS}/ws"

def process_image_with_comfyui(image_path, workflow_file):
    """
    Processes an image through ComfyUI using the specified workflow.
    """
    CLIENT_ID = str(uuid.uuid4())

    image_path = os.path.abspath(image_path)

    # Load the workflow
    workflow = load_workflow(workflow_file)

    # Modify the workflow to use the supplied image path
    modifications = {
        "12": {
            "image": image_path
        }
    }
    adjust_workflow(workflow, modifications)

    add_save_image_websocket_node(workflow, "8")

    ws = create_connection(f"{WS_URL}?clientId={CLIENT_ID}")
    images = get_images(workflow, ws, CLIENT_ID)
    ws.close()

    processed_images = save_images(images)

    return processed_images

def load_workflow(file_path):
    """Load the workflow JSON from a file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        workflow = json.load(file)
        
    return workflow

def adjust_workflow(workflow, modifications):
    """
    Adjust the workflow with provided modifications.
    """
    for node_id, changes in modifications.items():
        if node_id in workflow:
            for key, value in changes.items():
                workflow[node_id]['inputs'][key] = value
        else:
            print(f"Warning: Node ID {node_id} not found in workflow.")

def add_save_image_websocket_node(workflow, source_node_id):
    """
    Add a SaveImageWebsocket node to the workflow.
    """
    save_node_id = "save_image_websocket_node"
    workflow[save_node_id] = {
        "class_type": "SaveImageWebsocket",
        "inputs": {
            "images": [source_node_id, 0]
        }
    }
    
    return save_node_id

def queue_prompt(prompt, CLIENT_ID):
    data = json.dumps({"prompt": prompt, "client_id": CLIENT_ID}).encode('utf-8')
    req = urllib.request.Request(f"{API_URL}/prompt", data=data)
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read())
        prompt_id = result.get('prompt_id')
        
        return prompt_id

def get_images(prompt, ws, CLIENT_ID):
    """Execute the prompt and retrieve the generated images via WebSocket."""
    # Send the prompt and get the prompt_id
    prompt_id = queue_prompt(prompt, CLIENT_ID)
    output_images = {}
    current_node = ""
    while True:
        out = ws.recv()
        if isinstance(out, str):
            message = json.loads(out)
            if message['type'] == 'executing':
                data = message['data']
                if data['prompt_id'] == prompt_id:
                    if data['node'] is None:
                        break  # Execution is done
                    else:
                        current_node = data['node']
        else:
            # Binary data (image)
            if current_node == 'save_image_websocket_node':
                images_output = output_images.get(current_node, [])
                # Remove the first 8 bytes as per ComfyUI's format
                images_output.append(out[8:])
                output_images[current_node] = images_output

    return output_images

def save_images(images, output_dir='data'):
    """Save images to the specified directory and return their paths."""
    os.makedirs(output_dir, exist_ok=True)
    saved_image_paths = []
    for node_id, image_list in images.items():
        for idx, image_data in enumerate(image_list):
            image = Image.open(io.BytesIO(image_data))
            temp_filename = f"processed_{uuid.uuid4()}.png"
            image_path = os.path.join(output_dir, temp_filename)
            image.save(image_path)
            saved_image_paths.append(image_path)
    return saved_image_paths
