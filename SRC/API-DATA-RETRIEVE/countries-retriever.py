import csv
from db_connector import *

def add_countries_to_db():
    cnx = init_connection()
    cursor = cnx.cursor()
    with open('countries.csv','r',encoding="utf-8-sig") as csvfile:
        countriesCSV = csv.reader(csvfile, delimiter=',')
        for row in countriesCSV:
            country = str(row[0].replace(" ", "_"))
            country_code=str(row[1])
            add_country(cursor, country_code, country)

    # Changes commit and cleanup.
    cnx.commit()
    cursor.close()
    cnx.close()
add_countries_to_db()





