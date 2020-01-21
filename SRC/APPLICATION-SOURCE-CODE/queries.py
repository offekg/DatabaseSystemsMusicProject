def query2_top_playbacks_per_countries(all_countries):
    countries = all_countries.split(" ")

    query = """
SELECT SUM(playbacks.count) AS num_plays, track.name AS track_name, artist.name AS artist_name,
	 track.duration AS duration, album.name AS album_name
FROM (track INNER JOIN playbacks ON track.track_id = playbacks.track_id)
LEFT JOIN country ON playbacks.country_code = country.country_code
LEFT JOIN album ON track.album_id = album.album_id
LEFT JOIN album_artist ON track.album_id = album_artist.album_id
LEFT JOIN artist ON artist.artist_id = album_artist.artist_id
WHERE ("""

    query += "country.country_code =  \"{0}\"\n".format(countries[0])
    for i in range(1, len(countries)):
        query += "\tOR country.country_code = {0}\n".format(countries[i])

    query += """\t)
GROUP BY track.track_id, track.name, track.duration, artist.name ,album.name
ORDER BY SUM(playbacks.count) DESC
LIMIT 10"""

    return query


def query3_top_albums_by_global_playback():
    query = """
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
    query = """
SELECT artist_playbacks.artist_name AS artist_name,
artist_playbacks.average_artist_playback AS average_artist_playback,
artist_playbacks.sum_artist_playbacks AS sum_artist_playbacks,
artist_songs.max_song AS most_played_song, artist_songs.play_count AS most_played_sound_count,
artist_playbacks.photo
FROM( SELECT ar.artist_id AS artist_id, ar.name AS artist_name, ar.photo AS photo, ROUND(AVG(p.count)) AS average_artist_playback,
		SUM(p.count) sum_artist_playbacks, MAX(p.count) AS max_artist_playbacks
		FROM artist ar, track t, album_artist alar, playbacks p
		WHERE t.track_id = p.track_id
		AND t.album_id = alar.album_id
		AND ar.artist_id = alar.artist_id
		AND p.country_code = "global"
		GROUP BY ar.artist_id, ar.name, ar.photo
		ORDER BY AVG(p.count) DESC
		LIMIT 10) AS artist_playbacks
		JOIN (SELECT aa.artist_id AS art_id, t.name AS max_song, l.count AS play_count
				FROM track t, playbacks l, album_artist aa
				WHERE t.track_id = l.track_id AND l.country_code = "global"
				AND t.album_id = aa.album_id) artist_songs
		ON artist_playbacks.artist_id = artist_songs.art_id
		AND artist_playbacks.max_artist_playbacks = artist_songs.play_count
ORDER BY artist_playbacks.average_artist_playback DESC"""
    return query


def query5_longest_albums():
    query = """
SELECT album_name, artist_name, album_length, t.name AS longest_song, album_photo, longest_song
FROM
	(SELECT album.album_id AS album_id, album.name AS album_name, artist.name AS artist_name,
	SUM(track.duration) AS album_length, MAX(track.duration) AS longest_song, album.photo AS album_photo
	FROM track, album, artist, album_artist
	WHERE track.album_id = album.album_id
	AND track.album_id = album_artist.album_id
	AND artist.artist_id = album_artist.artist_id
	GROUP BY track.album_id, album.name, artist.name
	ORDER BY SUM(track.duration) DESC
	LIMIT 10
	) AS longest_albums
JOIN track t
ON longest_albums.album_id = t.album_id AND longest_albums.longest_song = t.duration
ORDER BY album_length DESC"""
    return query


def query6_most_played_between_year1_year2(year1, year2):
    query = """
SELECT track.name as track_name, artist.name AS artist_name, album.name AS album_name,
		 track.track_number AS track_number, album.release_year AS release_year, playbacks.count AS total_plays
FROM (track INNER JOIN playbacks ON track.track_id = playbacks.track_id)
LEFT JOIN
((album INNER JOIN album_artist ON album.album_id = album_artist.album_id)
 INNER JOIN artist ON album_artist.artist_id = artist.artist_id)
	ON track.album_id = album.album_id
WHERE playbacks.country_code = "global"
AND album.release_year >= {0}
AND album.release_year <= {1}
ORDER BY playbacks.count DESC
LIMIT 10""".format(year1, year2)
    return query


def query7_top_song_from_top_artist_in_genre(genre):
    query = """
SELECT top_track_name, top_track_plays, artist_name, top_track_album, total_artist_plays_in_genre
FROM
	(#top 10 artists in genre:
	SELECT ar.artist_id as artist_id, ar.name AS artist_name,
	       SUM(p.count) AS total_artist_plays_in_genre, MAX(p.count) max_song_plays, al.genre
	FROM artist ar, track t, playbacks p, album_artist alar, album al
	WHERE t.track_id = p.track_id
	AND t.album_id = alar.album_id
	AND alar.artist_id = ar.artist_id
	AND t.album_id = al.album_id
	AND al.genre = "{}"
	GROUP BY ar.artist_id, ar.name
	ORDER BY SUM(p.count) DESC
	LIMIT 10) AS top_singers
JOIN (SELECT t2.name AS top_track_name, ar2.artist_id AS ar_id, al2.name AS top_track_album,
				 p2.count AS top_track_plays
		FROM track t2, artist ar2, album al2, album_artist alar2, playbacks p2
		WHERE t2.album_id = alar2.album_id
		AND ar2.artist_id = alar2.artist_id
		AND t2.album_id = al2.album_id
		AND t2.track_id = p2.track_id) AS tracks_plays
ON top_singers.artist_id = tracks_plays.ar_id AND top_singers.max_song_plays = tracks_plays.top_track_plays
ORDER BY top_singers.total_artist_plays_in_genre desc""".format(genre)
    return query

#print(query2_top_playbacks_per_countries("\"us\""))
#print(query2_top_playbacks_per_countries("Canada Germany Finland Israel"))
#print(query3_top_albums_by_global_playback())
print( query4_top_artists_by_avg_global_playbacks())
#print(query6_most_played_between_year1_year2(2000,2012))
#print(query7_top_song_from_top_artist_in_genre("rock"))"""
