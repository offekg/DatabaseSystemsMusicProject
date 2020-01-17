import requests
import csv
from bs4 import BeautifulSoup
from db_connector import *
\

def add_charts_to_db():
    cnx = init_connection()
    cursor = cnx.cursor(buffered=True)
    with open('countries.csv', 'r', encoding="utf-8-sig") as csvfile:
        countriesCSV = csv.reader(csvfile, delimiter=',')
        for row in countriesCSV:
            country_code = str(row[1].replace(" ", "_"))
            if not country_code == "us":
                continue
            url = ("https://kworb.net/spotify/country/"+country_code+"_weekly_totals.html")
            page = requests.get(url)
            soup = BeautifulSoup(page.text, 'html.parser')
            all_table_lines = soup.find_all("tbody")[0].find_all("tr")
            all_songs=[]
            listens = []
            for line in all_table_lines:
                links=line.find_all('a')
                if len(links) == 0:
                    continue
                artist_contents = links[0].contents
                if len(artist_contents) == 0:
                    continue
                artist = artist_contents[0]
                track_contents = links[1].contents
                if len(track_contents) == 0:
                    continue
                track = track_contents[0]

                all_songs.append([artist, track])

                cells = line.find_all('td')
                listens.append(int(str(cells[7].contents[0]).replace(",","")))

            for x in range(0,len(all_songs)):
                a= str(all_songs[x][0])
                s= str(all_songs[x][1])
                l= listens[x]
                print (a,s,l)
                get_track_id(cursor,a,s)
                result = cursor.fetchone()
                if result is not None:
                    track_id = result[0]
                    if track_id is not None:
                        add_playbacks(cursor, track_id, country_code, l)

    # Changes commit and cleanup.
    cnx.commit()
    cursor.close()
    cnx.close()

add_charts_to_db()

