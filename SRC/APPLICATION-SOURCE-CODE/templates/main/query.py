import mysql.connector
from mysql.connector import Error
import simplejson as json
from templates.main.queries import *

query_num_to_query_string = {
    '1': query1_full_text_artist_bio_search,
    '2': query2_top_playbacks_per_countries,
    '3': query6_most_played_between_year1_year2,
    '4': query7_top_song_from_top_artist_in_genre,
    '5': query_albums_by_artist_name,
    '6': query_songs_like_name,
    '11': query3_top_albums_by_global_playback,
    '12': query4_top_artists_by_avg_global_playbacks,
    '13': query5_longest_albums,
    '14': query_old_love_songs,
    '15': query_christmas,
    '16': query_french_music,
    '17': query_pop_music,
    '18': query_country_songs,
    '19': query_israel_top_2019,
    '20': query_sinatra_songs,
    'song': query_track,
    'artist1': query_artist,
    'artist2': query_artist_discography,
    'album1': query_album,
    'album2': query_album_tracks,
}

def record_to_json(record):
    i = 0
    json_response = dict()

    for entry in record:
        json_response[str(i)] = entry
        i += 1

    return json.dumps(json_response)

def regular_query(query_num, *args):
    try:
        connection = mysql.connector.connect(host='mysqlsrv1.cs.tau.ac.il',
                                             port='3306',
                                             database='DbMysql04',
                                             user='DbMysql04',
                                             password='thesmiths')
        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            cursor.execute(query_num_to_query_string.get(query_num)(*args))
            record = cursor.fetchall()
            return record

    except Error as e:
            print("Error while connecting to MySQL", e)

    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def query_for_me(query_type, query_data):
    try:
        connection = mysql.connector.connect(host='mysqlsrv1.cs.tau.ac.il',
                                             port='3306',
                                             database='DbMysql04',
                                             user='DbMysql04',
                                             password='thesmiths')
        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            cursor.execute(query_num_to_query_string.get(query_type)(query_data))
            record = cursor.fetchall()
            return record

    except Error as e:
            print("Error while connecting to MySQL", e)

    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()

def additional_info_song(id):
    record = query_for_me('song', id)[0]
    print('record ' + str(record))

    response = {'name': record[0]}

    body = F'<b>Artist</b>: {record[1]}\n'
    body += F'<b>Duration</b>: {record[2]}\n'
    body += F'<b>Album</b>: {record[3]}\n'
    body += F'<b>Release Year</b>: {record[4]}\n'
    body += F'<b>Genre</b>: {record[5]}\n'

    response['body'] = body
    response['image'] = record[7]

    return response

def additional_info_artist(id):
    bio = query_for_me('artist1', id)[0]
    discs = query_for_me('artist2', id)

    response = {'name': bio[0]}

    body = F'<b>Bio</b>: {bio[1]}\n'
    body += F'<b>Most Played Song</b>: {bio[2]} ({bio[3]} Times)\n'
    body += F'<b>Discography</b>:\n'
    body += F'<table><tr><th>Name</th><th>Year Released</th></tr>\n'
    for album in discs:
        body += F'<tr><td>{album[0]}</td><td>{album[1]}</td></tr>\n'
    body += '</table>'

    response['body'] = body
    response['image'] = bio[4]

    return response

def additional_info_album(id):
    info = query_for_me('album1', id)
    print(info)
    songs = query_for_me('album2', id)

    response = {'name': info[0]}

    body = F'<b>Artist</b>: {info[1]}\n'
    body += F'<b>Release Year</b>: {info[2]}\n'
    body += F'<b>Genre</b>: {info[3]}\n'
    body += F'<b>Songs</b>:\n'
    for song in songs:
        body += F'Track #{song[0]} - {song[1]}\n'

    response['body'] = body
    response['image'] = info[4]

    return response
