import csv
import requests
from bs4 import BeautifulSoup

url = ("https://kworb.net/spotify/country/us_weekly.html")
page = requests.get(url)
file_name="us.csv"

with open(file_name, 'w') as csv_file:
    soup = BeautifulSoup(page.text, 'html.parser')
    title= soup.find_all(class_="text mp")
    all_songs=[]
    for t in title:
        songs=t.find_all('a')
        artist_song=[]
        for i in songs:
            artist_song.append(i.contents[0])
        all_songs.append(artist_song)

    print(all_songs)
    print(len(all_songs))

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