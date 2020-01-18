
def query2_top_playbacks_per_countries(all_countries):
    countries = all_countries.split(" ")


    query = """
SELECT SUM(playbacks.count) AS num_plays, track.name AS track_name, artist.name AS artist_name,
	 track.duration AS duration, album.name AS album_name
FROM track, playbacks, country,album, artist, album_artist
WHERE track.track_id = playbacks.track_id
AND playbacks.country_code = country.country_code
AND track.album_id = album.album_id
AND track.album_id = album_artist.album_id
AND artist.artist_id = album_artist.artist_id
AND ("""

    query += "country.name =  {0}\n".format(countries[0])
    for i in range(1, len(countries)):
        query += "\tOR country.name = {0}\n".format(countries[i])


    query += """\t)
GROUP BY track.track_id, track.name, track.duration, artist.name ,album.name
ORDER BY SUM(playbacks.count) DESC
LIMIT 10"""

    return query


def query3_top_albums_by_global_playback():
    query = """"
SELECT album_name, artist_name, total_global_playbacks, tl.max_song AS max_song_name, tl.play_count AS max_song_plays, photo_link
FROM (SELECT album.album_id AS album_id, album.name AS album_name, artist.name AS artist_name,
SUM(playbacks.count) AS total_global_playbacks, album.photo AS photo_link, MAX(playbacks.count) AS max_plays
		FROM track, album, artist, album_artist, playbacks
		WHERE track.track_id = playbacks.track_id
		AND track.album_id = album.album_id
		AND track.album_id = album_artist.album_id
		AND artist.artist_id = album_artist.artist_id
		AND playbacks.country_code = "global"  #change to global
		GROUP BY track.album_id, album.name, artist.name
		ORDER BY SUM(playbacks.count) DESC
		LIMIT 10
		) AS top_albums 
		JOIN (SELECT t.album_id AS aid, l.count play_count, t.name max_song
				from track t, playbacks l
				WHERE t.track_id = l.track_id AND l.country_code = "global") AS tl  #change to global
		ON top_albums.album_id = tl.aid AND top_albums.max_plays = tl.play_count"""
    return query


def query4_top_artists_by_avg_global_playbacks():
    query = """"
SELECT artist_playbacks.artist_name AS artist_name,
artist_playbacks.average_artist_playback AS average_artist_playback,
artist_playbacks.sum_artist_playbacks AS sum_artist_playbacks,
artist_songs.max_song AS most_played_song, artist_songs.play_count AS most_played_sound_count,
artist_playbacks.photo
FROM( SELECT ar.artist_id AS artist_id, ar.name AS artist_name, ar.photo AS photo, ROUND(AVG(p.count)) AS average_artist_playback,
		SUM(p.count) sum_artist_playbacks, MAX(p.count) AS max_artist_playbacks
		FROM artist ar, track t, album al, album_artist alar, playbacks p 
		WHERE t.track_id = p.track_id
		AND t.album_id = al.album_id
		AND t.album_id = alar.album_id
		AND ar.artist_id = alar.artist_id
		AND p.country_code = "global"
		GROUP BY ar.artist_id, ar.name, ar.photo
		ORDER BY AVG(p.count) DESC
		LIMIT 10) AS artist_playbacks
		JOIN (SELECT aa.artist_id AS art_id, t.name AS max_song, l.count AS play_count
				#SELECT t.album_id AS aid, l.count play_count, t.name max_song
				FROM track t, playbacks l, album_artist aa
				WHERE t.track_id = l.track_id AND l.country_code = "global"
				AND t.album_id = aa.album_id) artist_songs 
		ON artist_playbacks.artist_id = artist_songs.art_id 
		AND artist_playbacks.max_artist_playbacks = artist_songs.play_count
ORDER BY artist_playbacks.average_artist_playback DESC"""
    return query


print(query2_top_playbacks_per_countries("Canada Germany Finland Israel"))
print(query3_top_albums_by_global_playback())
