# Development changes and references

!!! Info "Theme options"

    ```python 
    theme="gradio/seafoam"
    theme="earneleh/paris"
    theme="xiaobaiyuan/theme_brief"
    theme="finlaymacklon/boxy_violet"
    theme="ysharma/steampunk"
    theme="ParityError/Interstellar"
    ```

!!! Example

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

!!! Info "Step 0"

    Navigate to your project folder in terminal/console


!!! Example "Step 1"
    
    ```console
    python -m venv .venv
    ```
 
!!! Example "Step 2: Enter into the virtual env"

    === "Visual Studio Code"

        ```console
        .venv\Scripts\activate
        ```

    === "Visual Stusio IDE"

        ```console
        .\venv\Scripts\Activate.ps1
        ```

!!! Tip

    Both commands are the same, but somehow, in this case, the Visual Studio IDE is bit different.
    if you face script execution policy error run below command:

!!! Example "Remove restriction for script execution policy"
    
    ```console
    Set-ExecutionPolicy Unrestricted -Scope Process
    ```


!!! Note 
    
    Skip step 3 if you already there. In case of docs website project you need to change to docs folder.

!!! Example "Step 3: Navigate to your project folder"

    ```console
    cd my_folder_name_or_path
    ```

!!! Example "Step 4: Generate the requirements.txt file"
    
    === "python"
        ```python
        pip install pipreqs
        ```

    === "console"
        ```console
        pipreqs --force
        ```

!!! Note 
    
    Using the force parameter overrides the existing file so be carefull


### MK Docs

!!! Example "Host local"
    
    ```console
    mkdocs serve
    ```

!!! Example "Generate static site"
    
    ```console
    mkdocs build
    ```
A folder with name 'site' will be created that you can deploy that on any website hosting platform. The website will be static so there is no need for any backend server.