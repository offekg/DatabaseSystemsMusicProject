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
            add_country(cursor, country_code, country) #insert country to countries relation

    # Changes commit and cleanup.
    cnx.commit()
    cursor.close()
    cnx.close()
add_countries_to_db()
            # with open('csv_files/' + country + '.csv', 'r',encoding="utf-8-sig") as csvfile1:
            #     chartsCSV=csv.reader(csvfile1, delimiter=',')
            #     for song in chartsCSV:
            #         artist_and_song= song[1].split(" - ")
            #         artist_name=artist_and_song[0].replace(" ", "_")
            #         song_name=artist_and_song[1].replace(" ", "_")
            #         num_played=int(song[7].replace(",", ""))
            #         #print(artist_name,song_name,num_played)
            #         ###INSERT TO LISTENED RELATION





