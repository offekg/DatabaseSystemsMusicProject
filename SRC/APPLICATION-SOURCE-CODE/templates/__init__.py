from flask import Flask

app = Flask(__name__,
 	static_folder = './public',
 	template_folder="./static")

from templates.main.views import main_blueprint
app.register_blueprint(main_blueprint)
