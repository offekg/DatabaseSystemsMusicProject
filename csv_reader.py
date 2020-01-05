import csv
import requests
import json

with open('artists2.csv','r',encoding="utf8") as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        artist=row[1].replace(" ", "_")
        response= requests.get("http://theaudiodb.com/api/v1/json/1/search.php?s="+artist)
        response_json=response.json()
        artist_details=response_json['artists'][0]
        #
        artist_id= int(artist_details['idArtist'])  #what if null??
        artist_born_year = int(artist_details['intBornYear'])  #what if null??
        artist_died_year =artist_details['intDiedYear']   #what if null??
        if artist_died_year is not None:
            artist_died_year = int(artist_details['intDiedYear'])
        artist_genre = artist_details['strGenre']
        artist_bio = artist_details['strBiographyEN']
        artist_gender=artist_details['strGender']
        artist_country = artist_details['strCountry']  #strCountryCode?
        artist_photo_url = artist_details['strArtistThumb']
        print(artist_died_year)




