import requests
from timeit import default_timer as timer


def get_artist_json(artist_name):
    start = timer()
    response_artists = requests.get("http://theaudiodb.com/api/v1/json/1/search.php?s=" + artist_name)
    response_artists_json = response_artists.json()
    end = timer()
    print("Artist response time: ", end - start)
    return response_artists_json

def get_albums_for_artist_json(theaudiodb_album_id):
    start = timer()
    response_albums = requests.get("https://theaudiodb.com/api/v1/json/1/album.php?i=" + str(theaudiodb_album_id))
    response_albums_json = response_albums.json()
    end = timer()
    print("Albums response time: ", end - start)
    return response_albums_json

def get_tracks_for_album_json(theaudiodb_album_id):
    response_tracks = requests.get("https://theaudiodb.com/api/v1/json/1/track.php?m=" + str(theaudiodb_album_id))
    return response_tracks.json()