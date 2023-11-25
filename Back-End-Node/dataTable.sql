CREATE TABLE city (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    calendar_id varchar(250)
);

CREATE TABLE user_attendance (
    id SERIAL PRIMARY KEY,
    username VARCHAR(250),
    email VARCHAR(250),
    token VARCHAR(250),
    homecity INT REFERENCES city(id),
    default_role VARCHAR(100)
);

CREATE TABLE lesson_content (
    id SERIAL PRIMARY KEY,
    module VARCHAR(250),
    module_no INT,
    week_no INT,
    lesson_topic VARCHAR(250),
    syllabus_link VARCHAR(250)
);

CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP,
    lesson_content_id INT REFERENCES lesson_content(id),
    city_id INT REFERENCES city(id),
    time_start TIMESTAMP,
    time_end TIMESTAMP,
    event_type VARCHAR(250),
    location VARCHAR(250)
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_attendance(id),
    session_id INT REFERENCES session(id),
    role int REFERENCES roles(id),
    period VARCHAR(100)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    city VARCHAR(150)
);