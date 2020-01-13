import csv
import requests
from db_connector import *



def api_to_db(start_index, stop_index):
    with open('artists.csv','r',encoding="utf-8-sig") as csvfile:

        cnx = init_connection()
        cursor = cnx.cursor()
        readCSV = csv.reader(csvfile, delimiter=',')
        count = 0
        print("============================",start_index,stop_index,"============================")
        for row in readCSV:
            count += 1
            if count <start_index:
                continue
            if count>=stop_index:
                break
            artist_name=row[1].replace(" ", "_")
            print(artist_name)
            #CHECK IF ARTIST IN CHARTS?

            response_artists= requests.get("http://theaudiodb.com/api/v1/json/1/search.php?s="+artist_name)

            response_artists_json=response_artists.json()
            if response_artists_json['artists'] is None:
                continue
            artist_details=response_artists_json['artists'][0]

            #artist row details
            artist_id= int(artist_details['idArtist'])  #what if null??
            artist_born_year = artist_details['intBornYear'] #what if null??
            #artist_genre = artist_details['strGenre']
            artist_bio = artist_details['strBiographyEN']
            #artist_gender=artist_details['strGender']
            #artist_country = artist_details['strCountry']  #strCountryCode?
            artist_photo_url = artist_details['strArtistThumb']

            add_artist(cursor,artist_name.replace("_", " "),artist_born_year,artist_bio,artist_photo_url)
            artist_db_id=cursor.lastrowid

            #albums details -per artist
            response_albums= requests.get("https://theaudiodb.com/api/v1/json/1/album.php?i=" + str(artist_id))
            response_albums_json =response_albums.json()
            for album in response_albums_json['album']:
                album_id=int(album['idAlbum'])
                album_name=album['strAlbum']
                album_release_year=album['intYearReleased']
                album_photo_url=album['strAlbumThumb']
                album_genre=album['strGenre']

                add_album(cursor,album_name,album_release_year,album_genre,album_photo_url)
                album_db_id=cursor.lastrowid
                add_album_artist(cursor,album_db_id,artist_db_id)

                # track details -per album
                response_tracks = requests.get("https://theaudiodb.com/api/v1/json/1/track.php?m=" + str(album_id))
                response_tracks_json = response_tracks.json()
                for track in response_tracks_json['track']:
                    track_name=track['strTrack']
                    track_duration_millisec=track['intDuration']
                    track_number=track['intTrackNumber']
                    add_track(cursor,track_name,track_duration_millisec,album_db_id,track_number)

        # Changes commit and cleanup.
        cnx.commit()
        cursor.close()
        cnx.close()




api_to_db(0,25)