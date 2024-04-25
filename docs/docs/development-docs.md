# Development changes and references

- Theme options:

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