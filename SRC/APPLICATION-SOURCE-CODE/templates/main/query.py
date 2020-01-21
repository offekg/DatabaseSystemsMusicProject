import mysql.connector
from mysql.connector import Error
import json
from templates.main.queries import *

query_num_to_query_string = {
    '1': None,
    '2': query2_top_playbacks_per_countries('us'),
    '3': query3_top_albums_by_global_playback(),
    '4': query4_top_artists_by_avg_global_playbacks(),
    '5': query5_longest_albums(),
    '6': query6_most_played_between_year1_year2(1900, 2100),
    '7': query7_top_song_from_top_artist_in_genre('pop'),
}

def record_to_json(record):
    i = 0
    json_response = dict()

    for entry in record:
        json_response[str(i)] = entry
        i += 1

    return json.dumps(json_response)

def test(query_num):
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
            cursor.execute(query_num_to_query_string.get(query_num))
            record = cursor.fetchall()
            return record

    except Error as e:
            print("Error while connecting to MySQL", e)

    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")
