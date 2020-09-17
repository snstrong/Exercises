-- Data Modeling Exercise: Schema Design
-- Part Three: Soccer League

DROP DATABASE IF EXISTS soccer_league;
CREATE DATABASE soccer_league;
\c soccer_league

CREATE TABLE teams (
    id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL
);

INSERT INTO teams (name) VALUES ('Colts');
INSERT INTO teams (name) VALUES ('Steelers');
INSERT INTO teams (name) VALUES ('Blues');
INSERT INTO teams (name) VALUES ('Cardinals');

CREATE TABLE players (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    team_id INT NOT NULL REFERENCES teams
);

INSERT INTO players (first_name, last_name, team_id) VALUES ('Willa', 'Lowes', 1);
INSERT INTO players (first_name, last_name, team_id) VALUES ('Shania', 'Appelton', 1);
INSERT INTO players (first_name, last_name, team_id) VALUES ('Amanda', 'Russell', 2);
INSERT INTO players (first_name, last_name, team_id) VALUES ('Kelly', 'Coleridge', 2);
INSERT INTO players (first_name, last_name, team_id) VALUES ('Joy', 'Williams', 3);
INSERT INTO players (first_name, last_name, team_id) VALUES ('Emily', 'Poe', 3);
INSERT INTO players (first_name, last_name, team_id) VALUES ('Catherine', 'Dailey', 4);
INSERT INTO players (first_name, last_name, team_id) VALUES ('Susanne', 'Schmidt', 4);

CREATE TABLE referees (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL
);

INSERT INTO referees (first_name, last_name) VALUES ('Frances', 'Gable');
INSERT INTO referees (first_name, last_name) VALUES ('Victoria', 'Mitchell');

CREATE TABLE matches (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    team_1_id INT REFERENCES teams,
    team_2_id INT REFERENCES teams,
    referee_id INT REFERENCES referees,
    winner_id INT REFERENCES teams
);

INSERT INTO matches (date, team_1_id, team_2_id, referee_id, winner_id)
    VALUES ('2019-06-20', 1, 2, 1, 1);
INSERT INTO matches (date, team_1_id, team_2_id, referee_id, winner_id)
    VALUES ('2019-06-20', 3, 4, 2, 4);
INSERT INTO matches (date, team_1_id, team_2_id, referee_id, winner_id)
    VALUES ('2019-06-27', 1, 3, 1, 3);
INSERT INTO matches (date, team_1_id, team_2_id, referee_id, winner_id)
    VALUES ('2019-06-27', 2, 4, 2, 2);
INSERT INTO matches (date, team_1_id, team_2_id, referee_id, winner_id)
    VALUES ('2019-07-03', 1, 4, 1, 1);
INSERT INTO matches (date, team_1_id, team_2_id, referee_id, winner_id)
    VALUES ('2019-07-03', 2, 3, 2, 2);

CREATE TABLE goals_scored (
    id SERIAL NOT NULL PRIMARY KEY,
    match_id INT REFERENCES matches,
    player_id INT REFERENCES players
);

-- To get rankings:
-- SELECT teams.name AS team, COUNT(winner_id) AS games_won FROM matches JOIN teams ON teams.id = matches.winner_id GROUP BY teams.name ORDER BY COUNT(winner_id) DESC;