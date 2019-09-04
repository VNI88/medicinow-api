\c medicinow_api;

DROP TABLE IF EXISTS APPOINTMENTS ;

DROP TABLE IF EXISTS PACIENTS;

DROP TABLE IF EXISTS DOCTORS ;

DROP TABLE IF EXISTS OFFICES ;

DROP TABLE IF EXISTS MEDICAL_AGREEMENTS;


CREATE TABLE IF NOT EXISTS MEDICAL_AGREEMENTS (
id SERIAL PRIMARY KEY,
brand VARCHAR NOT NULL ,
plan VARCHAR(18) NOT NULL,
UNIQUE (brand, plan),
created_at TIMESTAMP DEFAULT current_timestamp,
updated_at TIMESTAMP DEFAULT current_timestamp
);

CREATE  TABLE IF NOT EXISTS OFFICES (
id SERIAL PRIMARY KEY,
name VARCHAR,
street_address VARCHAR,
accepted_medical_agreement_id BIGINT REFERENCES MEDICAL_AGREEMENTS(id) ON DELETE RESTRICT,
created_at TIMESTAMP DEFAULT current_timestamp,
updated_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS DOCTORS (
id SERIAL PRIMARY KEY,
last_name VARCHAR NOT NULL,
first_name VARCHAR NOT NULL,
email VARCHAR UNIQUE NOT NULL,
password VARCHAR(8) UNIQUE NOT NULL,
gender VARCHAR NOT NULL,
age INTEGER NOT NULL,
office_id BIGINT REFERENCES OFFICES(id) ON DELETE RESTRICT,
crm VARCHAR UNIQUE NOT NULL,
appointment_value NUMERIC(10,2) NOT NULL,
created_at TIMESTAMP DEFAULT current_timestamp,
updated_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS PACIENTS (
id SERIAL PRIMARY KEY,
last_name VARCHAR NOT NULL,
first_name VARCHAR NOT NULL,
email VARCHAR UNIQUE NOT NULL,
password VARCHAR(8) UNIQUE NOT NULL,
age INTEGER NOT NULL,
gender VARCHAR NOT NULL,
street_address VARCHAR,
cpf VARCHAR (11) UNIQUE NOT NULL ,
rg VARCHAR (9) UNIQUE NOT NULL,
medical_agreement_id BIGINT REFERENCES MEDICAL_AGREEMENTS(id) ON DELETE RESTRICT,
card_number VARCHAR NOT NULL,
created_at TIMESTAMP DEFAULT current_timestamp,
updated_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS APPOINTMENTS (
id SERIAL PRIMARY KEY,
pacient_id BIGINT REFERENCES PACIENTS(id) ON DELETE RESTRICT,
doctor_id BIGINT REFERENCES DOCTORS(id) ON DELETE RESTRICT,
medical_agreement_id BIGINT REFERENCES MEDICAL_AGREEMENTS(id) ON DELETE RESTRICT,
appointment_day DATE NOT NULL,
appointment_hour TIMESTAMP NOT NULL,
UNIQUE(appointment_day, appointment_hour),
confirmed BOOLEAN DEFAULT true,
canceled BOOLEAN DEFAULT false,
created_at TIMESTAMP DEFAULT current_timestamp,
updated_at TIMESTAMP DEFAULT current_timestamp
);