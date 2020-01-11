import mysql.connector
from mysql.connector import errorcode
from tables import TABLES


USERNAME = 'DbMysql04'
PASSWORD = 'thesmiths'
DATABASE = 'DbMysql04'
PORT = '3305'

try:
  cnx = mysql.connector.connect(user=USERNAME, password=PASSWORD, database=DATABASE, port=PORT)
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)

cursor = cnx.cursor()


def create_database(cursor):
    try:
        cursor.execute(
            "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
    except mysql.connector.Error as err:
        print("Failed creating database: {}".format(err))
        exit(1)


def create_tables():
  for table_name in TABLES:
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


try:
    cursor.execute("USE {}".format(DATABASE))
except mysql.connector.Error as err:
    print("Database {} does not exists.".format(DATABASE))
    if err.errno == errorcode.ER_BAD_DB_ERROR:
        create_database(cursor)
        print("Database {} created successfully.".format(DATABASE))
        cnx.database = DATABASE
    else:
        print(err)
        exit(1)

create_tables()
cursor.close()
cnx.close()