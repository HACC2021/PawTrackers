SET ECHO ON;

USE paw_trackers;

-- ALTER TABLE flight
-- DROP CONSTRAINT trip_ibfk_2;

DROP TABLE IF EXISTS trip_document;
DROP TABLE IF EXISTS pet_document;
DROP TABLE IF EXISTS pet_trip;
DROP TABLE IF EXISTS person_user_login;
DROP TABLE IF EXISTS person_trip;
DROP TABLE IF EXISTS person_pet;
DROP TABLE IF EXISTS user_login;
DROP TABLE IF EXISTS document;
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS program;
DROP TABLE IF EXISTS flight;
DROP TABLE IF EXISTS mircochip;
DROP TABLE IF EXISTS visitor;
DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS person;

CREATE TABLE person (
	person_id VARCHAR(8) NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_initial CHAR NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    pet_relation ENUM(
		"Primary Owner",
        "Co-Owner",
        "Third Party Handler"
    ) NOT NULL,
    military_type ENUM(
		"Civilian",
        "Army",
        "Navy",
        "Marines",
        "Coast Guard",
        "Air Force",
        "Other"
	) NOT NULL,
    id_num INT(4) NOT NULL,
    id_type ENUM(
		"Passport",
        "Drivers License",
        "Company Card",
        "Native Tribal Card",
        "Other"
    ) NOT NULL,
	id_state VARCHAR(2) NOT NULL,
    id_exp_date DATE NOT NULL,
    addr_line1 VARCHAR(255) NOT NULL,
    addr_line2 VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zipcode INT(5) NOT NULL,
    hi_line1 VARCHAR(255) NOT NULL,
    hi_line2 VARCHAR(255) NOT NULL,
    hi_city VARCHAR(50) NOT NULL,
    hi_island ENUM(
		"Hawaii",
        "Maui",
        "Oahu",
        "Kauai"
    ) NOT NULL,
    hi_zipcode INT(5) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    alt_phone VARCHAR(15) NOT NULL,
    country_addr VARCHAR(10) NOT NULL,
    email VARCHAR(320) NOT NULL,
    update_time TIMESTAMP NOT NULL
);

CREATE TABLE pet(
    pet_id VARCHAR(8) NOT NULL PRIMARY KEY,
    pet_name VARCHAR(50) NOT NULL,
    species ENUM(
        "Dog",
        "Cat"
    ) NOT NULL,
    country VARCHAR(75) NOT NULL,
    birth_date DATE NOT NULL,
    breed VARCHAR(75) NOT NULL,
    sex ENUM(
        "M",
        "F"
    ) NOT NULL,
    spayed_neutered BOOL NOT NULL,
    color VARCHAR(50),
    update_time TIMESTAMP NOT NULL
);

CREATE TABLE visitor(
    visitor_id VARCHAR(8) NOT NULL PRIMARY KEY,
    pet_id VARCHAR(8) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_initial CHAR NULL,
    last_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id)
);

CREATE TABLE mircochip(
    mircochip_id VARCHAR(8) NOT NULL PRIMARY KEY,
    pet_id VARCHAR(8) NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id)
);

CREATE TABLE flight(
    airline VARCHAR(50) NOT NULL,
    flight_id VARCHAR(15) NOT NULL,
    departure VARCHAR(50) NOT NULL,
    arrival_destination VARCHAR(50) NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    PRIMARY KEY(airline, flight_id)
);

CREATE TABLE program(
    program_id ENUM(
        "direct_airport_release",
        "5_day",
        "early_5_day",
        "niip_dar",
        "subsequent_entry",
        "120_day",
        "transit"
    ) NOT NULL PRIMARY KEY,
    program_name VARCHAR(45) NOT NULL,
    base_price DECIMAL(12,2) NOT NULL,
    daily DECIMAL(12,2) NOT NULL,
    max_price DECIMAL(12,2) NOT NULL
);

CREATE TABLE trip(
    trip_id VARCHAR(8) NOT NULL PRIMARY KEY,
    airline VARCHAR(50) NOT NULL,
    flight_id VARCHAR(15) NOT NULL,
    program_id ENUM(
        "direct_airport_release",
        "5_day",
        "early_5_day",
        "niip_dar",
        "subsequent_entry",
        "120_day",
        "transit"
    ) NOT NULL,
    handler_status ENUM(
        "Incoming",
        "In Transit",
        "Present",
        "Picked Up"
    ) NOT NULL,
    covid_status ENUM(
        "Incomplete",
        "Vaccinated",
        "Tested",
        "Non-Compliant"
    ) NOT NULL,
    update_time TIMESTAMP NOT NULL,
    FOREIGN KEY (airline, flight_id) REFERENCES flight(airline, flight_id),
    FOREIGN KEY (program_id) REFERENCES program(program_id)
);

CREATE TABLE document(
    doc_id VARCHAR(8) NOT NULL PRIMARY KEY,
    doc_type ENUM(
        "Pet Import Form",
        "Prior Rabies Vaccine Certificate",
        "Current Rabies Vaccine Certificate",
        "Health Certificate",
        "Health Certificate Issued in Hawaii (for HI pets returning)"
    ) NOT NULL,
    doc_status ENUM(
        "Not Received",
        "Received",
        "Verified",
        "Rejected",
        "Expired"
    ) NOT NULL,
    link VARCHAR(255) NOT NULL,
    is_trip BOOL NOT NULL,
    is_pet BOOL NOT NULL,
    submission_time TIMESTAMP NOT NULL
);

CREATE TABLE user_login(
    user_login_id VARCHAR(8) NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    pword VARCHAR(50) NOT NULL
);

CREATE TABLE person_pet(
    person_id VARCHAR(8),
    pet_id VARCHAR(8),
    FOREIGN KEY (person_id) REFERENCES person(person_id),
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id),
    PRIMARY KEY(person_id, pet_id)
);

CREATE TABLE person_trip(
    person_id VARCHAR(8),
    trip_id VARCHAR(8),
    FOREIGN KEY (person_id) REFERENCES person(person_id),
    FOREIGN KEY (trip_id) REFERENCES trip(trip_id),
    PRIMARY KEY(person_id, trip_id)
);

CREATE TABLE person_user_login(
    person_id VARCHAR(8),
    user_login_id VARCHAR(8),
    FOREIGN KEY (person_id) REFERENCES person(person_id),
    FOREIGN KEY (user_login_id) REFERENCES user_login(user_login_id),
    PRIMARY KEY(person_id, user_login_id)
);

CREATE TABLE pet_trip(
    pet_id VARCHAR(8),
    trip_id VARCHAR(8),
    handler_id VARCHAR(8),
    pet_status VARCHAR(15),
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id),
    FOREIGN KEY (trip_id) REFERENCES trip(trip_id),
    FOREIGN KEY (handler_id) REFERENCES person(person_id),
    PRIMARY KEY(pet_id, trip_id)
);

CREATE TABLE pet_document(
    pet_id VARCHAR(8),
    doc_id VARCHAR(8),
    FOREIGN KEY (pet_id) REFERENCES pet(pet_id),
    FOREIGN KEY (doc_id) REFERENCES document(doc_id),
    PRIMARY KEY(pet_id, doc_id)
);

CREATE TABLE trip_document(
    trip_id VARCHAR(8),
    doc_id VARCHAR(8),
    FOREIGN KEY (trip_id) REFERENCES trip(trip_id),
    FOREIGN KEY (doc_id) REFERENCES document(doc_id),
    PRIMARY KEY(trip_id, doc_id)
);