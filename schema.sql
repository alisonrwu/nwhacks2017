-- cockroach sql --host=52.60.142.17 --database=nwhacks2017

DROP TABLE if EXISTS post, comment;

-- CREATE SEQUENCE post_id_seq; -- DEFAULT nextval('post_id_seq'),
CREATE TABLE post (
	id SERIAL PRIMARY KEY NOT NULL,
	time_stamp TIMESTAMP NOT NULL,
	content VARCHAR NOT NULL,
	lat REAL NOT NULL,
	long REAL NOT NULL,
	max_radius INT NOT NULL,
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