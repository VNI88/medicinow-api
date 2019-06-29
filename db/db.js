const pg = require ("pg");


const config = {
  user: 'vini',
  database: 'medicinow_api',
  password: 'pass123',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMilllis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('Connected to the database');
});

const createTables = () => {
  const medical_agreements =
    `CREATE TABLE MEDICAL_AGREEMENTS IF NOT EXISTS(
      id SERIAL PRIMARY KEY,
      brand VARCHAR UNIQUE ,
      plan VARCHAR(18) NOT NULL,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp
    );`

  const offices =
    `CREATE  TABLE OFFICES IF NOT EXISTS (
    id SERIAL PRIMARY KEY ,
    name VARCHAR,
    street_address VARCHAR,
    accepted_medical_agreement_id BIGINT REFERENCES MEDICAL_AGREEMENTS(id) ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
    )`;

  const doctors =
    `CREATE TABLE DOCTORS IF NOT EXISTS (
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
    )`;

  const pacients =
    `CREATE TABLE PACIENTS IF NOT EXISTS(
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
    )`;

  const appointments =
    `CREATE TABLE APPOINTMENTS IF NOT EXISTS (
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
    )`;

  const tables = [medical_agreements, offices, doctors, pacients, appointments];

  tables.forEach( t => {
    pool.query(t)
      .then( res => {
        console.log(res);
        pool.end();
      })
      .catch( err => {
        console.log(err);
        pool.end();
      });
  });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


const appointments = [
  {
    id: 1,
    doctor: "João",
    proficiency: "Oftalmologia",
    date: "19-06-19",
    time: "17:30",
    office: "Sírio Libânes",
    street_address: "Avenida José André de Moraes,1360"
  }
];

module.exports = {
  createTables,
  pool,
  appointments
};
require ('make-runnable');
