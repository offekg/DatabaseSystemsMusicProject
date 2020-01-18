import mysql.connector
from mysql.connector import Error
import json

def record_to_json(record):
    i = 0
    json_response = dict()

    for entry in record:
        json_response[str(i)] = entry
        i += 1

    return json.dumps(json_response)

def test():
    try:
        connection = mysql.connector.connect(host='mysqlsrv1.cs.tau.ac.il',
    					                     port='3306',
                                             database='DbMysql04',
                                             user='DbMysql04',
                                             password='thesmiths')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            cursor.execute("SELECT name,release_year,genre FROM album LIMIT 10;")
            record = cursor.fetchall()
            return record

    except Error as e:
            print("Error while connecting to MySQL", e)

    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")
