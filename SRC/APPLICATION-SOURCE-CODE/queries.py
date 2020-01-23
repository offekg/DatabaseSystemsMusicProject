def query1_full_text_artist_bio_search(search_items, year1=1900, year2=2020):
    search = search_items.split(",")
    query = """
SELECT NAME AS artist_name, birth_year, photo, artist_id
FROM artist
WHERE MATCH (bio) AGAINST("{0}")"""
    for i in range(1,len(search)):
        query += "AND MATCH (bio) AGAINST(\"{0}\")".format(search[i])
    query += """
AND artist.birth_year >= {0}
AND artist.birth_year <= {1}
    """.format(year1, year2)
    return query


def query2_top_playbacks_per_countries(all_countries):
    countries = all_countries.split(",")

    query = """
SELECT SUM(playbacks.count) AS num_plays, track.name AS track_name, artist.name AS artist_name,
	 track.duration AS duration, album.name AS album_name, track.track_id
FROM (track INNER JOIN playbacks ON track.track_id = playbacks.track_id)
LEFT JOIN country ON playbacks.country_code = country.country_code
LEFT JOIN album ON track.album_id = album.album_id
LEFT JOIN album_artist ON track.album_id = album_artist.album_id
LEFT JOIN artist ON artist.artist_id = album_artist.artist_id
WHERE ("""

    query += "country.name = \"{0}\"\n".format(countries[0])
    for i in range(1, len(countries)):
        query += "\tOR country.name == \"{0}\"\n".format(countries[i])

    query += """\t)
GROUP BY track.track_id, track.name, track.duration, artist.name, artist.artist_id ,album.name
ORDER BY SUM(playbacks.count) DESC
LIMIT 10"""

    return query


def query3_top_albums_by_global_playback():
    query = """
SELECT  album_name, artist_name, total_global_playbacks, tl.max_song AS max_song_name,
        tl.play_count AS max_song_plays, photo_link, album_id
FROM (SELECT album.album_id AS album_id, album.name AS album_name, artist.name AS artist_name, artist.artist_id AS artist_id,
SUM(playbacks.count) AS total_global_playbacks, album.photo AS photo_link, MAX(playbacks.count) AS max_plays
		FROM track, album, artist, album_artist, playbacks
		WHERE track.track_id = playbacks.track_id
		AND track.album_id = album.album_id
		AND track.album_id = album_artist.album_id
		AND artist.artist_id = album_artist.artist_id
		AND playbacks.country_code = "global"
		GROUP BY track.album_id, album.name, artist.name, artist.artist_id
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
artist_playbacks.photo, artist_playbacks.artist_id
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
SELECT album_name, artist_name, album_length, t.name AS longest_song, album_photo, longest_song,
longest_albums.album_id, longest_albums.artist_id, track_id
FROM
	(SELECT album.album_id AS album_id, album.name AS album_name, artist.name AS artist_name,
	SUM(track.duration) AS album_length, MAX(track.duration) AS longest_song, album.photo AS album_photo, artist.artist_id AS artist_id
	FROM track, album, artist, album_artist
	WHERE track.album_id = album.album_id
	AND track.album_id = album_artist.album_id
	AND artist.artist_id = album_artist.artist_id
	GROUP BY track.album_id, album.name, artist.name, artist.artist_id
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
		 track.track_number AS track_number, album.release_year AS release_year,
		 playbacks.count AS total_plays, track.track_id AS track_id
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
SELECT top_track_name, top_track_plays, artist_name, top_track_album, total_artist_plays_in_genre, track_id
FROM 
	(#top 10 artists in genre globaly:
	SELECT ar.artist_id as artist_id, ar.name AS artist_name,
	       SUM(p.count) AS total_artist_plays_in_genre, MAX(p.count) max_song_plays, al.genre
	FROM artist ar, track t, playbacks p, album_artist alar, album al
	WHERE t.track_id = p.track_id
	AND t.album_id = alar.album_id
	AND alar.artist_id = ar.artist_id
	AND t.album_id = al.album_id
	AND p.country_code = "global"
	AND al.genre = "pop"  #genre chosen by user
	GROUP BY ar.artist_id, ar.name
	ORDER BY SUM(p.count) DESC
	LIMIT 10) AS top_singers
JOIN (SELECT t2.name AS top_track_name, t2.track_id AS track_id, ar2.artist_id AS ar_id, al2.name AS top_track_album,
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
#print( query4_top_artists_by_avg_global_playbacks())
#print(query6_most_played_between_year1_year2(2000,2012))
#print(query7_top_song_from_top_artist_in_genre("rock"))"""


def query_track(track_id):
    query = """
SELECT track.name AS track_name ,artist.name AS artist_name,
album.name AS album_name, album.release_year AS album_release_year,
album.genre AS album_genre, album.photo AS album_photo_url, artist.photo AS artist_photo_url, artist.artist_id
FROM track, album, album_artist, artist
WHERE track.track_id = {0}
AND track.album_id = album.album_id
AND album.album_id = album_artist.album_id
AND album_artist.artist_id = artist.artist_id""".format(track_id)
    return query


def query_artist(artist_id):
    query = """
SELECT artist.name AS artist_name, artist.bio AS artist_bio, track.name AS most_played_song_global,
playbacks.count AS num_played, artist.photo AS artist_photo_url, artist.artist_id
FROM artist, album_artist, album, track, playbacks
WHERE artist.artist_id = {0}
AND artist.artist_id = album_artist.artist_id
AND album_artist.album_id = album.album_id 
AND track.album_id = album.album_id
AND playbacks.country_code = "global" 
AND track.track_id = playbacks.track_id
ORDER BY playbacks.count DESC
LIMIT 3""".format(artist_id)
    return query


def query_artist_discography (artist_id):
    query = """
SELECT album.name, album.release_year, album.album_id
FROM artist, album_artist, album
WHERE artist.artist_id = {0} 
AND artist.artist_id = album_artist.artist_id
AND album_artist.album_id = album.album_id""".format(artist_id)
    return query


def query_album (album_id):
    query = """
SELECT album.name AS album_name, artist.name AS artist_name,
album.release_year AS album_release_year, album.genre AS album_genre, album.photo AS album_photo_url, artist.artist_id, album.album_id
FROM album, album_artist, artist
WHERE album.album_id = {0}
AND album.album_id = album_artist.album_id 
AND album_artist.artist_id = artist.artist_id""".format(album_id)
    return query


def query_album_tracks(album_id):
    query = """
SELECT track.track_number, track.name
FROM track, album
WHERE album.album_id = {0} 
AND album.album_id=track.album_id
ORDER BY track.track_number""".format(album_id)
    return query


def query_french_music():
    query = """
SELECT DISTINCT t.name AS Track, a.name AS Artist, t.duration AS Duration, p.count AS Streams, t.track_id
FROM track AS t, playbacks AS p, album AS al, album_artist AS ala, artist AS a
WHERE t.track_id = p.track_id AND
        t.album_id = al.album_id AND
        al.album_id = ala.album_id AND
        ala.artist_id = a.artist_id AND
        p.country_code = "fr"
ORDER BY p.count DESC
LIMIT 10"""
    return query


def query_pop_music():
    query = """
SELECT DISTINCT t.track_id, t.name AS Track, a.name AS Artist, t.duration AS Duration, p.count AS Streams, t.track_id
FROM track AS t, playbacks AS p, album AS al, album_artist AS ala, artist AS a
WHERE t.track_id = p.track_id
      AND t.album_id = al.album_id
      AND al.album_id = ala.album_id
      AND ala.artist_id = a.artist_id
      AND p.country_code = "global"
      AND al.genre = "pop"
ORDER BY p.count DESC
LIMIT 10"""
    return query


def query_country():
    query = """
SELECT track.name AS track_name, track.duration, artist.name AS artist_name, album.name AS album_name, track.track_id
FROM album JOIN track ON album.album_id = track.album_id
JOIN album_artist ON album.album_id = album_artist.album_id
JOIN artist ON artist.artist_id = album_artist.artist_id
WHERE album.genre = "Country"
ORDER BY track.track_number
LIMIT 10"""
    return query


def query_christmas():
    query = """
SELECT track.name AS track_name, artist.name AS artist_name, track.duration AS duration,
       album.release_year AS release_year, album.name AS album_name,track.track_id AS track_id
FROM
	(SELECT max(t.track_id) AS track_id, a.artist_id AS artist_id
	FROM track AS t, album AS al, album_artist AS ala, artist AS a
	WHERE t.album_id = al.album_id
	      AND al.album_id = ala.album_id
	      AND ala.artist_id = a.artist_id
	      AND t.name LIKE "%christmas%"
	GROUP BY a.artist_id, a.name
	LIMIT 10) AS christmas_songs,
	track, album, artist
WHERE christmas_songs.track_id = track.track_id
AND christmas_songs.artist_id = artist.artist_id
AND album.album_id = track.album_id"""
    return query


def query_israel_top_2019():
    query = """
SELECT t.name AS track_name, p.count AS streams, ar.name AS artist_name, al.name AS album_name, t.track_id AS track_id
FROM track t, playbacks p, album al, album_artist ala, artist ar
WHERE p.country_code = "il"
AND t.track_id = p.track_id
AND al.album_id = t.album_id
AND al.album_id = ala.album_id
AND ala.artist_id = ar.artist_id
AND al.release_year = 2019

ORDER BY p.count desc"""
    return query


def query_old_love_songs():
    query = """
SELECT track.name AS track_name, artist.name AS artist_name, track.duration AS duration,
       album.release_year AS release_year, album.name AS album_name,track.track_id AS track_id
FROM
	(SELECT max(t.track_id) AS track_id, a.artist_id AS artist_id
	FROM track AS t, album AS al, album_artist AS ala, artist AS a
	WHERE t.album_id = al.album_id
	      AND al.album_id = ala.album_id
	      AND ala.artist_id = a.artist_id
	      AND (t.name LIKE "%love%")
	      AND al.release_year < 1980
	GROUP BY a.artist_id, a.name
	LIMIT 10) AS christmas_songs,
	track, album, artist
WHERE christmas_songs.track_id = track.track_id
AND christmas_songs.artist_id = artist.artist_id
AND album.album_id = track.album_id"""
    return query


def query_sinatra_songs():
    query = """
SELECT track.name AS track_name, track.duration AS duration, al.name AS album_name, al.release_year AS release_year,
track.track_id AS track_id
FROM (
	SELECT MIN(t.track_id) AS track_id, al.album_id AS album_id
	FROM track t, album_artist ala, album al
	WHERE t.album_id = ala.album_id
	AND al.album_id = t.album_id
	AND ala.artist_id = 755
	GROUP BY al.album_id
	LIMIT 10) AS sinatra_songs,
track, album al
WHERE track.track_id = sinatra_songs.track_id
AND al.album_id = sinatra_songs.album_id"""
    return query


def query_albums_by_artist_name(name):
    query = """
SELECT ar.name AS artist_name, al.name AS album_name, al.release_year AS release_year, al.album_id AS album_id
FROM album al, album_artist ala, artist ar
WHERE ar.name LIKE "%{0}%"
AND ar.artist_id = ala.artist_id
AND ala.album_id = al.album_id
ORDER BY ar.artist_id, al.release_year""".format(name)
    return query


def query_songs_like_name(name):
    query = """
SELECT track.name AS track_name, artist.name AS artist_name, album.name AS album_name,
album.release_year AS release_year, album.genre AS genre, track.track_id AS track_id
FROM track, album, album_artist, artist
WHERE track.name like "%{0}%"
AND track.album_id = album.album_id
AND track.album_id = album_artist.album_id
AND album_artist.artist_id = artist.artist_id

LIMIT 10""".format(name)
    return query

