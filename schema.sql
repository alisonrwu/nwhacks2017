-- cockroach sql --host=52.60.142.17 --database=nwhacks2017

DROP TABLE if EXISTS post, comment;

-- CREATE SEQUENCE post_id_seq; -- DEFAULT nextval('post_id_seq'),
CREATE TABLE post (
	id SERIAL PRIMARY KEY NOT NULL,
	time_stamp TIMESTAMP NOT NULL,
	content VARCHAR NOT NULL,
	lat REAL NOT NULL,
	long REAL NOT NULL,
	max_life INT NOT NULL
);
-- ALTER SEQUENCE post_id_seq OWNED BY post.id; --FLOAT(10,6)

-- CREATE SEQUENCE comment_id_seq;
CREATE TABLE comment (
	id SERIAL PRIMARY KEY NOT NULL,
	post_id INT NOT NULL,
	time_stamp TIMESTAMP NOT NULL,
	username VARCHAR NOT NULL,
	content VARCHAR NOT NULL
);
-- ALTER SEQUENCE comment_id_seq OWNED BY comment.id;

INSERT INTO post(time_stamp, content, lat, long, max_life) VALUES
	('2016-01-25 10:10:10.555555','https://aos.iacpublishinglabs.com/question/aq/1400px-788px/pandas-live_64dff22c2fe56e9.jpg?domain=cx.aos.ask.com',
		-33.861034, 151.171936, 10);