from flask import render_template, Blueprint
main_blueprint = Blueprint('main',__name__)
from templates.main.query import test
import json

@main_blueprint.route('/')
def index():
	return render_template("index.html")

@main_blueprint.route('/timor')
def timor():
	return test()
