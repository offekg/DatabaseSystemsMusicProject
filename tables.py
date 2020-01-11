TABLES = {}


TABLES['artist'] = (
    "CREATE TABLE `artist` ("
    "  `artist_id` INT AUTO_INCREMENT,"
    "  `name` VARCHAR(255) NOT NULL,"
    "  `born_year` SMALLINT,"
    "  `bio` TEXT,"
    "  `photo` VARCHAR(255),"
    "  PRIMARY KEY (`artist_id`)"
    ") ENGINE=InnoDB")

TABLES['album'] = (
    "CREATE TABLE `album` ("
    "  `album_id` INT AUTO_INCREMENT,"
    "  `name` VARCHAR(255) NOT NULL,"
    "  `release_year` SMALLINT,"
    "  `genre` VARCHAR(30),"
    "  `photo` VARCHAR(255),"
    "  PRIMARY KEY (`album_id`)"
    ") ENGINE=InnoDB")

TABLES['track'] = (
    "CREATE TABLE `track` ("
    "  `track_id` INT AUTO_INCREMENT,"
    "  `name` VARCHAR(255) NOT NULL,"
    "  `duration` INT NOT NULL,"
    "  `album_id` INT,"
    "  `track_number` SMALLINT,"
    "  PRIMARY KEY (`track_id`),"
    "  CONSTRAINT fk_album"
    "    FOREIGN KEY (album_id)" 
    "    REFERENCES album(album_id)"
    ") ENGINE=InnoDB")

TABLES['country'] = (
    "CREATE TABLE `country` ("
    "  `name` VARCHAR(255) NOT NULL,"
    "  PRIMARY KEY (`name`)"
    ") ENGINE=InnoDB")

TABLES['album_artist'] = (
    "CREATE TABLE `album_artist` ("
    "  `album_id` INT,"
    "  `artist_id` INT,"
    "  CONSTRAINT"
    "    FOREIGN KEY (album_id)" 
    "    REFERENCES album(album_id),"
    "  CONSTRAINT"
    "    FOREIGN KEY (artist_id)" 
    "    REFERENCES artist(artist_id)"
    ") ENGINE=InnoDB")

TABLES['listen'] = (
    "CREATE TABLE `listen` ("
    "  `track_id` INT,"
    "  `country_name` VARCHAR(255),"
    "  `count` INT DEFAULT 0,"
    "  CONSTRAINT fk_track"
    "    FOREIGN KEY (track_id)" 
    "    REFERENCES track(track_id),"
    "  CONSTRAINT fk_country"
    "    FOREIGN KEY (country_name)" 
    "    REFERENCES country(name)"
    ") ENGINE=InnoDB")
