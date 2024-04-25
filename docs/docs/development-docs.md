# Development changes and references

#### Theme options

```python 
theme="gradio/seafoam"
theme="earneleh/paris"
theme="xiaobaiyuan/theme_brief"
theme="finlaymacklon/boxy_violet"
theme="ysharma/steampunk"
theme="ParityError/Interstellar"
theme="ParityError/Interstellar"
```

- Example:

```python 
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
```

#### Generate automatic requirements.txt

- Step 0: Navigate to your project folder in terminal/console


- Step 1: Create a virtual env
```console
python -m venv .venv
```

- Step 2: Enter into the virtual env
activate virtual environment (VS Code):
```console
.venv\Scripts\activate
```
activate virtual environment (VS IDE):
```console
.\venv\Scripts\Activate.ps1
```
Both commands are the same, but somehow, in this case, the Visual Studio IDE is bit different.
if you face script execution policy error run below command:
```console
Set-ExecutionPolicy Unrestricted -Scope Process
```

- Step 3: Navigate to your project folder
Note: Skip this step if you already there. In case of docs website project you need to change to docs folder.
```console
cd my_folder_name_or_path
```

- Step 4: Generate the requirements.txt file
```python
pip install pipreqs
```
```console
pipreqs --force
```
Note: using the force parameter overrides the existing file so be carefull


### MK Docs

MK Docs is the website for documenting all the development of source code/features/usage etc...

- Run the mkdocs website locally
```console
mkdocs serve
```

- Generate site folder for hosting 
```console
mkdocs build
```