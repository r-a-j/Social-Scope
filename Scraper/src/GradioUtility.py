import gradio as gr


class GradioUtility:
    @staticmethod
    def show_error(message):
        raise gr.Error(message)


    @staticmethod
    def show_warning(message):
        gr.Warning(message)


    @staticmethod
    def show_info(message):
        gr.Info(message)
