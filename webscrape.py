import csv
import requests
from bs4 import BeautifulSoup

url = ("https://kworb.net/spotify/country/us_weekly.html")
page = requests.get(url)
file_name="us.csv"
'''
with open(file_name, 'w') as csv_file:
    soup = BeautifulSoup(page.text, 'html.parser')
    print(soup.prettify())
    all_table_lines= soup.find_all(class_="text mp")
    all_songs=[]
    for line in all_table_lines:
        tracks=line.find_all('a')
        artist_track=[]
        for track in tracks:
            artist_track.append(track.contents[0])
        all_songs.append(artist_track)

    #print(all_songs)
    #print(len(all_songs)) '''


with open(file_name, 'w') as csv_file:
    soup = BeautifulSoup(page.text, 'html.parser')
    #print(soup.prettify())
    all_table_lines= soup.find_all(class_="d0")    ##there is also d1 and d2!!!
    all_songs=[]
    listens = []
    for line in all_table_lines:
        tracks=line.find_all('a')
        artist_track=[]
        for track in tracks:
            artist_track.append(track.contents[0])
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
        ###INSERT TO TABLE!

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