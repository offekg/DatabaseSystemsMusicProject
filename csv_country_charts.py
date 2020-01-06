import csv
countries=[] #empty list

with open('csv_files/countries.csv','r',encoding="utf-8-sig") as csvfile:
    countriesCSV = csv.reader(csvfile, delimiter=',')
    for row in countriesCSV:
        country = str(row[0].replace(" ", "_"))
        print(country)
        url='csv_files/' + country + '.csv'
        print(url)
        #countries.append(country)
        with open(url, 'r',encoding="utf-8-sig") as csvfile1:
            chartsCSV=csv.reader(csvfile1, delimiter=',')
            for song in chartsCSV:
                artist_and_song= song[1].split(" - ")
                artist=artist_and_song[0].replace(" ", "_")
                song_name=artist_and_song[1].replace(" ", "_")
                num_played=int(song[7].replace(",", ""))
                print(artist)
                print(song_name)
                print(num_played)


