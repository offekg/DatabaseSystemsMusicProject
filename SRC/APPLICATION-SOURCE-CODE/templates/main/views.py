from flask import render_template, Blueprint, jsonify, request
main_blueprint = Blueprint('main',__name__)
from templates.main.query import regular_query, additional_info_song, additional_info_artist, additional_info_album
import simplejson as json

query_num_to_reuired_args = {
	'1': ['search', 'fromYear', 'toYear'],
    '2': ['countries'],
    '3': ['fromYear', 'toYear'],
    '4': ['genre'],
    '5': ['search'],
    '6': ['search']
}

@main_blueprint.route('/')
def index():
	return render_template("index.html")

@main_blueprint.route('/query', methods=['GET'])
def query():
	query_num = request.args.get('queryNum')
	query_args = list()

	required_args = query_num_to_reuired_args.get(query_num)
	if required_args:
		for arg in required_args:
			current_arg = request.args.get(arg)
			if current_arg:
				query_args.append(current_arg)

	return json.dumps(regular_query(query_num, *query_args))

@main_blueprint.route('/modal', methods=['GET'])
def modal():
	query_type = request.args.get('queryType')
	id = int(request.args.get('id'))

	if query_type == 'song':
		data = additional_info_song(id)
		return json.dumps(data)

	elif query_type == 'artist':
		data = additional_info_artist(id)
		return json.dumps(data)

	elif query_type == 'album':
		data = additional_info_album(id)
		return json.dumps(data)
