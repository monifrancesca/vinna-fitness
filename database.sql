CREATE TABLE location (
id serial PRIMARY KEY,
name varchar(100) NOT NULL
);

CREATE TABLE users (
id serial PRIMARY KEY,
first_name varchar(100) NOT NULL,
last_name varchar(100) NOT NULL,
email varchar(100),
admin boolean,
google_id varchar(100) NOT NULL,
google_token varchar(100) NOT NULL
);

CREATE TABLE exercise (
id serial PRIMARY KEY,
name varchar(100) NOT NULL,
category varchar(100)
);
INSERT INTO exercise (name)
VALUES ('Single Leg Deadlift');
INSERT INTO exercise (name)
VALUES ('Bag Toss');
INSERT INTO exercise (name)
VALUES ('Bag Clean');
INSERT INTO exercise (name)
VALUES ('Bent Row');
INSERT INTO exercise (name)
VALUES ('Bent Press');
INSERT INTO exercise (name)
VALUES ('Jump Rope');
INSERT INTO exercise (name)
VALUES ('Step Up');
INSERT INTO exercise (name)
VALUES ('Racked Step Up');
INSERT INTO exercise (name)
VALUES ('Plank Knee to Elbow');
INSERT INTO exercise (name)
VALUES ('Lizard Crawl');


INSERT INTO exercise (name)
VALUES ('Walkout');
INSERT INTO exercise (name)
VALUES ('Lunge Twist');
INSERT INTO exercise (name)
VALUES ('Marching');
INSERT INTO exercise (name)
VALUES ('Jump and land');
INSERT INTO exercise (name)
VALUES ('Ice Skater');
INSERT INTO exercise (name)
VALUES ('Pull Up');
INSERT INTO exercise (name)
VALUES ('Leg Lowering');
INSERT INTO exercise (name)
VALUES ('Hip Raises');
INSERT INTO exercise (name)
VALUES ('Quad Reach Back');
INSERT INTO exercise (name)
VALUES ('Russian Twist');
INSERT INTO exercise (name)
VALUES ('Toe Touch');
INSERT INTO exercise (name)
VALUES ('Quad Twist');
INSERT INTO exercise (name)
VALUES ('Sitout');
INSERT INTO exercise (name)
VALUES ('Shoulder Taps');
INSERT INTO exercise (name)
VALUES ('Mountain Climber');
INSERT INTO exercise (name)
VALUES ('Foam Rolling');
INSERT INTO exercise (name)
VALUES ('Thruster');
INSERT INTO exercise (name)
VALUES ('Curl to Press');
INSERT INTO exercise (name)
VALUES ('Burpee');
INSERT INTO exercise (name)
VALUES ('Jumping Jacks');
INSERT INTO exercise (name)
VALUES ('Row 1000m, rest 1 min (actively on rower)');
INSERT INTO exercise (name)
VALUES ('TRX single leg squat');
INSERT INTO exercise (name)
VALUES ('TRX W Fly');
INSERT INTO exercise (name)
VALUES ('TRX plank');
INSERT INTO exercise (name)
VALUES ('TRX Y fly');
INSERT INTO exercise (name)
VALUES ('Racked walk');
INSERT INTO exercise (name)
VALUES ('Full TGU');
INSERT INTO exercise (name)
VALUES ('Deadlift');
INSERT INTO exercise (name)
VALUES ('Chops/lifts');
INSERT INTO exercise (name)
VALUES ('Slams');
INSERT INTO exercise (name)
VALUES ('Farmer Carry');
INSERT INTO exercise (name)
VALUES ('½ TGU');
INSERT INTO exercise (name)
VALUES ('Squats');
INSERT INTO exercise (name)
VALUES ('Bent over row');
INSERT INTO exercise (name)
VALUES ('Russian Twist');
INSERT INTO exercise (name)
VALUES ('TRX Inverted Row');
INSERT INTO exercise (name)
VALUES ('TRX Assisted Squat');
INSERT INTO exercise (name)
VALUES ('Push-up');
INSERT INTO exercise (name)
VALUES ('TRX Single leg reach');
INSERT INTO exercise (name)
VALUES ('TRX Bicep curls');
INSERT INTO exercise (name)
VALUES ('TRX Tricep Extensions');



CREATE TABLE medical_conditions (
id SERIAL PRIMARY KEY,
condition VARCHAR(100)
);
INSERT INTO medical_conditions (condition)
VALUES ('dislocations');
INSERT INTO medical_conditions (condition)
VALUES ('phlebitis');
INSERT INTO medical_conditions (condition)
VALUES ('neck injuries');
INSERT INTO medical_conditions (condition)
VALUES ('low back pain');
INSERT INTO medical_conditions (condition)
VALUES ('high blood pressure');
INSERT INTO medical_conditions (condition)
VALUES ('heart problems');
INSERT INTO medical_conditions (condition)
VALUES ('headaches');
INSERT INTO medical_conditions (condition)
VALUES ('arthritis');
INSERT INTO medical_conditions (condition)
VALUES ('numbness/tingling/nerve conditions');
INSERT INTO medical_conditions (condition)
VALUES ('fainting spells');

CREATE TABLE client (
id serial PRIMARY KEY,
first_name varchar(100) NOT NULL,
last_name varchar(100) NOT NULL,
email varchar(100),
phone varchar(100),
dob date NOT NULL,
last_medical timestamp,
height varchar(100),
weight integer,
emergency_name varchar(100),
emergency_phone varchar(100),
current_injuries varchar(500),
previous_medical_hist varchar(500),
medications varchar(500),
infection boolean,
inflammation boolean,
flu boolean,
fever boolean,
cold boolean,
physician_name varchar(100),
physician_phone varchar(100),
location_id INTEGER REFERENCES location(id),
signature varchar(100),
signature_date timestamp,
signature_under_age varchar(100),
signature_date_under_age timestamp,
active_status boolean
);

CREATE TABLE client_conditions (
id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES client(id),
condition_id INTEGER REFERENCES medical_conditions(id)
);


CREATE TABLE class (
id SERIAL PRIMARY KEY,
class_type VARCHAR(100)
);
INSERT INTO class (class_type)
VALUES ('movement/mobility');
INSERT INTO class (class_type)
VALUES ('yoga');
INSERT INTO class (class_type)
VALUES ('rowing');
INSERT INTO class (class_type)
VALUES ('total body conditioning');
INSERT INTO class (class_type)
VALUES ('kettlebells');
INSERT INTO class (class_type)
VALUES ('ropes and bags');
INSERT INTO class (class_type)
VALUES ('suspension training');
INSERT INTO class (class_type)
VALUES ('barre');
INSERT INTO class (class_type)
VALUES ('vinna x');

CREATE TABLE workout (
id serial PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
client_id INTEGER REFERENCES client(id),
date date NOT NULL,
location_id INTEGER REFERENCES location(id),
flag boolean,
notes varchar(500),
stretching varchar(500),
warmup_notes varchar(500),
class_type INTEGER REFERENCES class(id)
);

CREATE TABLE workout_line_items (
id serial PRIMARY KEY,
worout_id INTEGER REFERENCES workout(id),
exercise_id INTEGER REFERENCES exercise(id),
sets INTEGER,
time INTEGER,
distance INTEGER,
body_weight boolean,
intensity_lbs INTEGER,
intensity_kgs INTEGER,
warmup boolean
);

CREATE TABLE fms (
id SERIAL PRIMARY KEY,
deep_squat INTEGER NOT NULL,
toe_touch BOOLEAN,
deep_squat_df VARCHAR(500),
hurdle_step INTEGER NOT NULL,
left_leg_up INTEGER NOT NULL,
right_leg_up INTEGER NOT NULL,
hurdle_df VARCHAR(500),
in_line_lunge INTEGER NOT NULL,
left_leg_forward INTEGER NOT NULL,
right_leg_forward INTEGER NOT NULL,
lunge_df VARCHAR(500),
shoulder_mobility INTEGER NOT NULL,
left_top INTEGER NOT NULL,
right_top INTEGER NOT NULL,
l_impingement BOOLEAN,
r_impingement BOOLEAN,
shoulder_df VARCHAR(500),
active_straight_leg INTEGER NOT NULL,
asl_l_up INTEGER NOT NULL,
asl_r_up INTEGER NOT NULL,
leg_raise_df VARCHAR(500),
trunk_pushup INTEGER NOT NULL,
prone_press BOOLEAN,
trunk_df VARCHAR(500),
rotary_stability INTEGER NOT NULL,
flexion BOOLEAN,
rotary_left_up INTEGER NOT NULL,
rotary_right_up INTEGER NOT NULL,
rotary_df VARCHAR(500),
total INTEGER NOT NULL,
client_id INTEGER NOT NULL REFERENCES client(id),
user_id INTEGER NOT NULL REFERENCES users(id),
date DATE NOT NULL,
hand_dominance VARCHAR(25),
swing_dominance VARCHAR(25),
throw_dominance VARCHAR(25),
leg_dominance VARCHAR(25),
shin_length REAL,
hand_length REAL
);

ALTER TABLE workout_line_items ADD COLUMN reps INTEGER;
ALTER TABLE workout_line_items RENAME COLUMN worout_id TO workout_id;
ALTER TABLE exercise ADD COLUMN active_status BOOLEA