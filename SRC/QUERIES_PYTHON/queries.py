
def query2_top_playbacks_per_countries(all_countries):
    countries = all_countries.split(" ")


    query = """
SELECT SUM(listen.count) AS num_plays, track.name AS track_name, artist.name AS artist_name,
	 track.duration AS duration, album.name AS album_name
FROM track, listen, country,album, artist, album_artist
WHERE track.track_id = listen.track_id
AND listen.country_code = country.country_code
AND track.album_id = album.album_id
AND track.album_id = album_artist.album_id
AND artist.artist_id = album_artist.artist_id
AND ("""

    query += "country.name =  {0}\n".format(countries[0])
    for i in range(1, len(countries)):
        query += "\tOR country.name = {0}\n".format(countries[i])


    query += """\t)
GROUP BY track.track_id, track.name, track.duration, artist.name ,album.name
ORDER BY SUM(listen.count) DESC
LIMIT 10"""

    return query


def query3_top_albums_by_global_playback():
    query = """"
SELECT album_name, artist_name, total_global_playbacks, tl.max_song AS max_song_name, tl.play_count AS max_song_plays, photo_link
FROM (SELECT album.album_id AS album_id, album.name AS album_name, artist.name AS artist_name,
SUM(listen.count) AS total_global_playbacks, album.photo AS photo_link, MAX(listen.count) AS max_plays
		FROM track, album, artist, album_artist, listen
		WHERE track.track_id = listen.track_id
		AND track.album_id = album.album_id
		AND track.album_id = album_artist.album_id
		AND artist.artist_id = album_artist.artist_id
		AND listen.country_code = "global"  #change to global
		GROUP BY track.album_id, album.name, artist.name
		ORDER BY SUM(listen.count) DESC
		LIMIT 10
		) AS top_albums 
		JOIN (SELECT t.album_id AS aid, l.count play_count, t.name max_song
				from track t, listen l
				WHERE t.track_id = l.track_id AND l.country_code = "global") AS tl  #change to global
		ON top_albums.album_id = tl.aid AND top_albums.max_plays = tl.play_count"""
    return query


print(query2_top_playbacks_per_countries("Canada Germany Finland Israel"))
print(query3_top_albums_by_global_playback())
