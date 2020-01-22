from flask import render_template, Blueprint, jsonify, request
main_blueprint = Blueprint('main',__name__)
from templates.main.query import regular_query, additional_info_song, additional_info_artist, additional_info_album
import simplejson as json

@main_blueprint.route('/')
def index():
	return render_template("index.html")

@main_blueprint.route('/query', methods=['GET'])
def query():
	query_num = request.args.get('queryNum')
	return json.dumps(regular_query(query_num))

@main_blueprint.route('/modal', methods=['GET'])
def modal():
	query_type = request.args.get('queryType')
	id = int(request.args.get('id'))

	if query_type == 'song':
		data = additional_info_song(id)
		print(data)
		return json.dumps(data)

	elif query_type == 'artist':
		data = additional_info_artist(id)
		print(data)
		return json.dumps(data)

	elif query_type == 'album':
		data = additional_info_album(id)
		print(data)
		return json.dumps(data)
