-- Data Modeling Exercise: Schema Critique
-- Part Three: Music

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

-- Given code to be revised:
-- 
-- CREATE TABLE songs
-- (
--   id SERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   duration_in_seconds INTEGER NOT NULL,
--   release_date DATE NOT NULL,
--   artists TEXT[] NOT NULL,
--   album TEXT NOT NULL,
--   producers TEXT[] NOT NULL
-- );

-- INSERT INTO songs
--   (title, duration_in_seconds, release_date, artists, album, producers)
-- VALUES
--   ('MMMBop', 238, '04-15-1997', '{"Hanson"}', 'Middle of Nowhere', '{"Dust Brothers", "Stephen Lironi"}'),
--   ('Bohemian Rhapsody', 355, '10-31-1975', '{"Queen"}', 'A Night at the Opera', '{"Roy Thomas Baker"}'),
--   ('One Sweet Day', 282, '11-14-1995', '{"Mariah Cary", "Boyz II Men"}', 'Daydream', '{"Walter Afanasieff"}'),
--   ('Shallow', 216, '09-27-2018', '{"Lady Gaga", "Bradley Cooper"}', 'A Star Is Born', '{"Benjamin Rice"}'),
--   ('How You Remind Me', 223, '08-21-2001', '{"Nickelback"}', 'Silver Side Up', '{"Rick Parashar"}'),
--   ('New York State of Mind', 276, '10-20-2009', '{"Jay Z", "Alicia Keys"}', 'The Blueprint 3', '{"Al Shux"}'),
--   ('Dark Horse', 215, '12-17-2013', '{"Katy Perry", "Juicy J"}', 'Prism', '{"Max Martin", "Cirkut"}'),
--   ('Moves Like Jagger', 201, '06-21-2011', '{"Maroon 5", "Christina Aguilera"}', 'Hands All Over', '{"Shellback", "Benny Blanco"}'),
--   ('Complicated', 244, '05-14-2002', '{"Avril Lavigne"}', 'Let Go', '{"The Matrix"}'),
--   ('Say My Name', 240, '11-07-1999', '{"Destiny''s Child"}', 'The Writing''s on the Wall', '{"Darkchild"}');

------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------------

  -- Revision:
  -- 

  CREATE TABLE artists
  (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
  );

  INSERT INTO artists
    (name)
  VALUES
    ('Hanson'),
    ('Queen'),
    ('Mariah Carey'),
    ('Boyz II Men');

  ------------------------------------------------------

  CREATE TABLE producers
  (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
  );

  INSERT INTO producers
    (name)
  VALUES
    ('Dust Brothers'),
    ('Stephen Lironi'),
    ('Roy Thomas Baker'),
    ('Walter Afanasieff');

  ------------------------------------------------------

  CREATE TABLE albums
  (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
  );

  INSERT INTO albums
    (name)
  VALUES
    ('Middle of Nowhere'),
    ('A Night at the Opera'),
    ('Daydream');

  ------------------------------------------------------

  CREATE TABLE songs
  (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    duration_in_seconds INTEGER NOT NULL,
    album_id INT REFERENCES albums,
    release_date DATE NOT NULL
  );

  INSERT INTO songs
    (name, duration_in_seconds, album_id, release_date)
  VALUES
    ('MMMBop', 238, 1, '04-15-1997'),
    ('Bohemian Rhapsody', 355, 2, '10-31-1975'),
    ('One Sweet Day', 282, 3, '11-14-1995');

  ------------------------------------------------------

  CREATE TABLE credits
  (
    id SERIAL PRIMARY KEY,
    song_id INT NOT NULL REFERENCES SONGS,
    artist_id INT REFERENCES artists,
    producer_id INT REFERENCES producers
  );

  INSERT INTO credits
    (song_id, artist_id, producer_id)
  VALUES
    -- MMMBop
    (1, 1, NULL),
    (1, NULL, 1),
    (1, NULL, 2),
    -- Bohemian Rhapsody
    (2, 2, NULL),
    (2, NULL, 3),
    -- One Sweet Day
    (3, 3, NULL),
    (3, 4, NULL),
    (3, NULL, 4);
