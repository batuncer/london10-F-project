CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE cohort (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    google_calendar_url varchar(250),
    region_id INT REFERENCES region(id)
);

CREATE TABLE role (
    -- e.g. Zoom Master, Tech Ed Assistant, Personal Development Lead
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    slack_photo_link VARCHAR(250),
    slack_username VARCHAR(250),
    slack_email VARCHAR(250),
    slack_token VARCHAR(250),
    default_cohort_id INT REFERENCES cohort(id),
    default_role_id INT REFERENCES role(id)
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
    time_start TIMESTAMP,
    time_end TIMESTAMP,
    event_type VARCHAR(250),  -- e.g. Technical Education/Personal Development
    location VARCHAR(250),  -- can also be Zoom link
    lesson_content_id INT REFERENCES lesson_content(id),  -- derive name of session from this+cohort
    cohort_id INT REFERENCES cohort(id)
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    period VARCHAR(100),
    person_id INT REFERENCES person(id),
    session_id INT REFERENCES session(id),
    role_id INT REFERENCES role(id)
);
