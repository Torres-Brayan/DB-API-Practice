\c practicedb;

DROP TABLE IF EXISTS workouts;

CREATE TABLE workouts(
    id serial,
    body_part varchar(50),
    exercise varchar(50)
);

INSERT INTO workouts (
    body_part,
    exercise
) VALUES (
    'chest',
    'bench press'
), (
    'legs',
    'squats'
);