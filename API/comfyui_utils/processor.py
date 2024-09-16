# comfyui_utils/processor.py
import os
import json
import uuid
import urllib.request
import websocket
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

    # Load the workflow
    with open(workflow_file, 'r', encoding='utf-8') as file:
        workflow = json.load(file)

    # Find the LoadImage node and update its input
    load_image_node_id = None
    for node_id, node in workflow.items():
        if node['class_type'] == 'LoadImage':
            load_image_node_id = node_id
            node['inputs']['image'] = image_path
            break

    if load_image_node_id is None:
        raise ValueError("No LoadImage node found in the workflow.")

    # Add the SaveImageWebsocket node
    save_node_id = "save_image_websocket_node"
    # Assuming the output node is '8' (adjust if different)
    source_node_id = '8'
    workflow[save_node_id] = {
        "class_type": "SaveImageWebsocket",
        "inputs": {
            "images": [source_node_id, 0]
        }
    }

    # Initialize WebSocket connection
    ws = websocket.WebSocket()
    ws.connect(f"{WS_URL}?clientId={CLIENT_ID}")

    # Send the workflow to the ComfyUI API
    data = json.dumps({"prompt": workflow, "client_id": CLIENT_ID}).encode('utf-8')
    req = urllib.request.Request(f"{API_URL}/prompt", data=data)
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read())
        prompt_id = result.get('prompt_id')

    # Receive images via WebSocket
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
            if current_node == save_node_id:
                images_output = output_images.get(current_node, [])
                # Remove the first 8 bytes as per ComfyUI's format
                images_output.append(out[8:])
                output_images[current_node] = images_output

    ws.close()

    # Save the processed images
    processed_images = []
    for image_data in output_images.get(save_node_id, []):
        image = Image.open(io.BytesIO(image_data))
        temp_filename = f"processed_{uuid.uuid4()}.png"
        temp_path = os.path.join('data', temp_filename)
        image.save(temp_path)
        processed_images.append(temp_path)

    return processed_images
