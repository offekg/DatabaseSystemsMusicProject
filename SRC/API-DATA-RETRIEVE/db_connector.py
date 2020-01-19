import mysql.connector
from mysql.connector import errorcode
from tables import CREATION_ORDER, DELETION_ORDER, TABLES

USERNAME = 'DbMysql04'
PASSWORD = 'thesmiths'
DATABASE = 'DbMysql04'
PORT = '3305'


def init_connection():
    cnx = None
    try:
        cnx = mysql.connector.connect(user=USERNAME, password=PASSWORD, database=DATABASE, port=PORT)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    return cnx


def create_database(cursor):
    try:
        cursor.execute(
            "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DATABASE))
    except mysql.connector.Error as err:
        print("Failed creating database: {}".format(err))
        exit(1)


def create_tables(cursor):
    for table_name in CREATION_ORDER:
        table_description = TABLES[table_name]
        try:
            print("Creating table {}: ".format(table_name), end='')
            cursor.execute(table_description)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("already exists.")
            else:
                print(err.msg)
        else:
            print("OK")


def drop_tables(cursor):
    for table_name in DELETION_ORDER:
        cursor.execute("DROP TABLE IF EXISTS {}".format(table_name))


def add_artist(cursor, name, birth_year, bio, photo):
    insert_statement = '''
  INSERT INTO artist(name, birth_year, bio, photo) 
  VALUES (%s, %s, %s, %s)
  '''
    cursor.execute(insert_statement, (name, birth_year, bio, photo))


def add_country(cursor, country_code, name):
    insert_statement = '''
  INSERT INTO country(country_code, name) 
  VALUES (%s, %s)
  '''
    cursor.execute(insert_statement, (country_code, name))


def add_album(cursor, name, release_year, genre, photo):
    insert_statement = '''
  INSERT INTO album(name, release_year, genre, photo) 
  VALUES (%s, %s, %s, %s)
  '''
    cursor.execute(insert_statement, (name, release_year, genre, photo))


def add_track(cursor, name, duration, album_id, track_number):
    insert_statement = '''
  INSERT INTO track(name, duration, album_id, track_number)
  VALUES (%s, %s, %s, %s)
  '''
    cursor.execute(insert_statement, (name, duration, album_id, track_number))


def add_album_artist(cursor, album_id, artist_id):
    insert_statement = '''
  INSERT INTO album_artist(album_id, artist_id) 
  VALUES (%s, %s)
  '''
    cursor.execute(insert_statement, (album_id, artist_id))


def add_playbacks(cursor, tack_id, country_code, count):
    insert_statement = '''
  INSERT INTO playbacks(track_id, country_code, count) 
  VALUES (%s, %s, %s)
  '''
    cursor.execute(insert_statement, (tack_id, country_code, count))

def get_track_id(cursor, artist, track):
    query = ('''SELECT track_id 
                FROM track
                JOIN album_artist ON track.album_id = album_artist.album_id
                JOIN artist ON album_artist.artist_id = artist.artist_id
                WHERE artist.name = %s AND UPPER(track.name) = UPPER(%s)''')
    cursor.execute(query, (artist, track))

def create_dummy_content(cursor):
    add_artist(cursor, 'ido', 1995, 'meleh haolam',
               'https://www.theaudiodb.com/images/media/artist/thumb/uxrqxy1347913147.jpg')
    add_album(cursor, "gg", 2012, "pop", None)
    add_album_artist(cursor,3,1)
    add_country(cursor, "USA")
    add_track(cursor, 'ppp', 2034564, 3, 4)
    add_playbacks(cursor, 6, "USA", 1444)

def reset_database():
    # Initializing the connection to the database.
    cnx = init_connection()
    if cnx is None:
        print("Oops! Something went wrong. Exiting...")
        exit(1)
    cursor = cnx.cursor()

    # Dropping previously created tables.
    drop_tables(cursor)

    # Creating the tables.
    create_tables(cursor)

    # Changes commit and cleanup.
    cnx.commit()
    cursor.close()
    cnx.close()