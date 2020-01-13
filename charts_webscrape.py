import requests
import csv
from bs4 import BeautifulSoup
from db_connector import *
import db_connector

def add_charts_to_db():
    cnx = init_connection()
    cursor = cnx.cursor()
    with open('countries.csv', 'r', encoding="utf-8-sig") as csvfile:
        countriesCSV = csv.reader(csvfile, delimiter=',')
        for row in countriesCSV:
            country = str(row[1].replace(" ", "_"))
            url = ("https://kworb.net/spotify/country/"+country+"_weekly.html")
            page = requests.get(url)
            soup = BeautifulSoup(page.text, 'html.parser')
            #print(soup.prettify())
            #all_table_lines= soup.find_all(class_="d0")    ##there is also d1 and d2!!!
            all_table_lines = soup.find_all("tr")
            all_songs=[]
            listens = []
            for line in all_table_lines:
                tracks=line.find_all('a')
                artist_track=[]
                for track in tracks:
                    artist_track.append(track.contents[0])
                if artist_track!=[]:
                    all_songs.append(artist_track)

                numbers=line.find_all('td')
                i=0
                for num in numbers:
                    if i==8:
                        listens.append(int(str(num.contents[0]).replace(",","")))
                        i=0
                    i+=1

            for x in range(0,len(all_songs)):
                a= str(all_songs[x][0]).replace(" ", "_")
                s= str(all_songs[x][1]).replace(" ", "_")
                l= listens[x]
                print (a,s,l)
                track_id=get_track_id(cursor,a,s)
                if track_id is not None:
                    add_listen(cursor, track_id, country, l)

    # Changes commit and cleanup.
    cnx.commit()
    cursor.close()
    cnx.close()

add_charts_to_db()

'''
with open('csv_files/countries.csv','r',encoding="utf-8-sig") as csvfile:
    countriesCSV = csv.reader(csvfile, delimiter=',')
    for row in countriesCSV:
        country = str(row[0].replace(" ", "_"))
        url = ("https://kworb.net/spotify/country/" + country +".html")
        page = requests.get(url)
        file_name=country+".csv"
        with open(file_name, 'w') as csv_file:
            soup = BeautifulSoup(page.text, 'html.parser')
            print (soup.prettify())
'''