from flask import render_template, Blueprint, jsonify, request
main_blueprint = Blueprint('main',__name__)
from templates.main.query import test
import simplejson as json

@main_blueprint.route('/')
def index():
	return render_template("index.html")

@main_blueprint.route('/timor', methods=['GET'])
def timor():
	query_num = request.args.get('queryNum')
	return json.dumps(test(query_num))
