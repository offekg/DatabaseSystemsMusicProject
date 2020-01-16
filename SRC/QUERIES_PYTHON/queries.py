

def query2_top_playbacks_per_countries(all_countries):
    countries = all_countries.split(" ")


    query = """
SELECT track_name, num_plays, artist_name, duration, album_name
FROM 
    (SELECT SUM(listen.count) AS num_plays, track.name AS track_name, artist.name AS artist_name,
	track.duration AS duration, album.name AS album_name
    FROM track, listen, country,album, artist, album_artist
	WHERE track.track_id = listen.track_id
	AND listen.country_code = country.country_code
	AND track.album_id = album.album_id
	AND track.album_id = album_artist.album_id
	AND artist.artist_id = album_artist.artist_id
	AND ("""

    query += "country.name =  {0}\n".format(countries[0])
    for i in range(1,len(countries)):
        query += "\t\tOR country.name = {0}\n".format(countries[i])


    query += """\t\t)
    GROUP BY track.track_id, track.name, track.duration, artist.name ,album.name
    ) AS ALL_Track_plays
ORDER BY num_plays DESC
LIMIT 10"""
    return query


print(query2_top_playbacks_per_countries("Canada Germany Finland Israel"))
