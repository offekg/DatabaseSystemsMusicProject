import csv
import requests

with open('csv_files/artists.csv','r',encoding="utf8") as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        artist_name=row[1].replace(" ", "_")
        response_artists= requests.get("http://theaudiodb.com/api/v1/json/1/search.php?s="+artist_name)
        response_artists_json=response_artists.json()
        artist_details=response_artists_json['artists'][0]

        #artist row details
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

        ###INSERT ARTIST TO ARTISTS RELATION

        #albums details -per artist
        response_albums= requests.get("https://theaudiodb.com/api/v1/json/1/album.php?i=" + str(artist_id))
        response_albums_json =response_albums.json()
        for album in response_albums_json['album']:
            album_id=int(album['idAlbum'])
            album_name=album['strAlbum']
            album_release_year=album['intYearReleased']
            album_photo_url=album['strAlbumThumb']
            album_genre=album['strGenre']
            ###INSERT ALBUMS TO ALBUMS RELATION

            # track details -per album
            response_tracks = requests.get("https://theaudiodb.com/api/v1/json/1/track.php?m=" + str(album_id))
            response_tracks_json = response_tracks.json()
            for track in response_tracks_json['track']:
                track_id = track['idTrack']
                track_name=track['strTrack']
                track_duration_millisec=track['intDuration']
                track_number=track['intTrackNumber']
                ###INSERT TRACK TO SONGS RELATION






