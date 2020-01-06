import csv

with open('csv_files/countries.csv','r',encoding="utf-8-sig") as csvfile:
    countriesCSV = csv.reader(csvfile, delimiter=',')
    for row in countriesCSV:
        country = str(row[0].replace(" ", "_"))

        ###INSERT COUNTRY TO COUNTRIES RELATION
        with open('csv_files/' + country + '.csv', 'r',encoding="utf-8-sig") as csvfile1:
            chartsCSV=csv.reader(csvfile1, delimiter=',')
            for song in chartsCSV:
                artist_and_song= song[1].split(" - ")
                artist_name=artist_and_song[0].replace(" ", "_")
                song_name=artist_and_song[1].replace(" ", "_")
                num_played=int(song[7].replace(",", ""))
                ###INSERT TO LISTENED RELATION





