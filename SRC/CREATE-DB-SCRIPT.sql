CREATE TABLE `artist` (
      `artist_id` INT AUTO_INCREMENT,
      `name` VARCHAR(255) NOT NULL,
      `birth_year` YEAR,
      `bio` TEXT,
      `photo` VARCHAR(255),
      PRIMARY KEY (`artist_id`),
      INDEX `birth_year_index` (`birth_year`),
      FULLTEXT idx (`bio`)
    );

CREATE TABLE `album` (
      `album_id` INT AUTO_INCREMENT,
      `name` VARCHAR(255) NOT NULL,
      `release_year` YEAR,
      `genre` VARCHAR(30),
      `photo` VARCHAR(255),
      PRIMARY KEY (`album_id`),
      INDEX `release_year_index` (`release_year`),
      INDEX `genre_index` (`genre`)
    );


CREATE TABLE `track` (
      `track_id` INT AUTO_INCREMENT,
      `name` VARCHAR(255) NOT NULL,
      `duration` INT NOT NULL,
      `album_id` INT,
      `track_number` SMALLINT,
      PRIMARY KEY (`track_id`),
      INDEX `duration_index` (`duration`),
      CONSTRAINT fk_album
        FOREIGN KEY (album_id)
        REFERENCES album(album_id)
    );

CREATE TABLE `country` (
      `country_code` VARCHAR(6) NOT NULL,
      `name` VARCHAR(255) NOT NULL,
      PRIMARY KEY (`country_code`)
    );

CREATE TABLE `album_artist` (
      `album_id` INT,
      `artist_id` INT,
      CONSTRAINT
        FOREIGN KEY (album_id)
        REFERENCES album(album_id),
      CONSTRAINT
        FOREIGN KEY (artist_id)
        REFERENCES artist(artist_id)
    );

CREATE TABLE `playbacks` (
      `track_id` INT,
      `country_code` VARCHAR(6),
      `count` BIGINT DEFAULT 0,
      INDEX `count_index` (`count`),
      CONSTRAINT fk_track
        FOREIGN KEY (track_id)
        REFERENCES track(track_id),
      CONSTRAINT fk_country
        FOREIGN KEY (country_code)
        REFERENCES country(country_code)
    );
