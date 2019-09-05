require('dotenv').config()

let promise = require('bluebird');

let options = {
  //Initialized options
  promiseLib: promise

};

const pgp = require('pg-promise')(options);

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  ssl: true,
  connectionString: process.env.DATABASE_URL
};

const db = pgp(config);

/**********************************************
Queries for /medical_agreements endpoint
***********************************************/

let getAllMedicalAgreements = () => {
  let query =
  `
  SELECT *
  FROM MEDICAL_AGREEMENTS
   `;

  return  db.any(query);
};

let getMedicalAgreement = (params) => {
  let query =
  `
  SELECT *
  FROM MEDICAL_AGREEMENTS
  WHERE brand = \${brand} AND plan = \${plan}
  `;

  return db.one(query, params);
};

let createMedicalAgreement = (body) => {
  let query =
  `
  INSERT INTO MEDICAL_AGREEMENTS (brand, plan)
  VALUES (\${brand}, \${plan})
  `;

  db.none( query, body);
};

let updateMedicalAgreement = (medical_agreement_id, body) => {
  let query =
  `
  UPDATE MEDICAL_AGREEMENTS
  SET brand = \${brand} , plan = \${plan}
  WHERE medical_agreement_id = \${medical_agreement_id}
  `;

  return db.result(query, body);
};

let deleteMedicalAgreement = (medical_agreement_id) => {
  let query =
  `
  DELETE
  FROM MEDICAL_AGREEMENTS
  WHERE medical_agreement_id = \$1
  `;

return  db.result(query, medical_agreement_id)
};

/**********************************************
Queries for /doctors endpoint
***********************************************/
let getAllDoctors = () => {
  let query =
  `
  SELECT *
  FROM DOCTORS
   `;

  return  db.any(query);

};

let getDoctor = (id) => {
  let query =
  `
  SELECT *
  FROM DOCTORS
  WHERE doctor_id = \$1
  `;

  return db.many(query, id);
};

let getFreeDoctors = (queryParameter) => {
  let query =
  `
  SELECT doctor_id, first_name, last_name, office_id
  FROM DOCTORS
  WHERE doctor_id NOT IN
                  (SELECT doctor_id
                  FROM APPOINTMENTS
                  WHERE appointment_day = \${appointment_day} AND  appointment_hour  = \${appointment_hour});
  `;

  return db.many(query, queryParameter);
};

let createDoctor = (body) => {

  let query =
  `
  INSERT INTO DOCTORS (last_name, first_name, telephone, email, password, crm, speciality)
  VALUES (\${last_name}, \${first_name}, \${telephone}, \${email}, \${password}, \${crm}, \${speciality})
  RETURNING doctor_id
  `;

  return db.one(query, body);
};

let verifyDoctor = (email) => {
  let query =
  `
  SELECT *
  FROM DOCTORS
  WHERE email = \${email}
  `

  return db.oneOrNone(query, email);
};

let updateDoctor = (doctor_id, body) => {
  let query =
  `
  UPDATE DOCTORS
  SET first_name = \${first_name} , last_name = \${last_name}, telephone = \${telephone}, email = \${email}, password = \${password}
  WHERE doctor_id = ${doctor_id}
  `;

  return db.result(query, body);
};

let deleteDoctor = (doctor_id) => {
  let query =
  `
  DELETE
  FROM DOCTORS
  WHERE doctor_id = \$1
  `;

return  db.result(query, doctor_id)
};


/**********************************************
Queries for /offices endpoint
***********************************************/
let getAllOffices = () => {
  let query =
  `
  SELECT *
  FROM OFFICES
   `;

  return  db.many(query);

};

let getOffice = (streeAddress) => {
  let query =
  `
  SELECT *
  FROM OFFICES
  WHERE street_address = \$1
  `;

  return db.many(query, street_address);
};

let createOffice = (body) => {
  let query =
  `
  INSERT INTO OFFICES ( street_address)
  VALUES ( \${street_address})
  RETURNING office_id
  `;

  db.one(query, body);
};

let updateOffice = (office_id, body) => {
  let query =
  `
  UPDATE OFFICES
  SET brand = \${brand} , plan = \${plan}
  WHERE office_id = ${office_id}
  `;

  return db.result(query, body);
};

let deleteOffice = (office_id) => {
  let query =
  `
  DELETE
  FROM OFFICES
  WHERE office_id = \$1
  `;

return  db.result(query, office_id)
};

/**********************************************
Queries for /pacients endpoint
***********************************************/
let getAllPacients = () => {
  let query =
  `
  SELECT *
  FROM PACIENTS
   `;

  return  db.any(query);

};

let getPacient = (pacient_id) => {
  let query =
  `
  SELECT *
  FROM PACIENTS
  WHERE pacient_id = \$1
  `;

  return db.one(query, pacient_id);
};

let getPacientWithEmail = (email) => {
  let query =
  `
  SELECT *
  FROM PACIENTS
  WHERE email = \$1
  `;

return  db.result(query, email)
};

let createPacient = (body) => {
  let query =
  `
  INSERT INTO PACIENTS (first_name, last_name, telephone, email, password)
  VALUES (\${first_name}, \${last_name}, \${telephone}, \${email}, \${password})
  RETURNING pacient_id
  `;

  return db.one(query, body);
};

let verifyPacient = (body) => {
  let query =
  `
  SELECT *
  FROM PACIENTS
  WHERE email = \${email}
  `;

  return db.oneOrNone(query, body);
};

let updatePacient = (pacient_id, body) => {
  let query =
  `
  UPDATE PACIENTS
  SET first_name = \${first_name} , last_name = \${last_name}, telephone = \${telephone}, email = \${email}, password = \${password}
  WHERE pacient_id = ${pacient_id}
  `;

  return db.result(query, body);
};

let deletePacient = (pacient_id) => {
  let query =
  `
  DELETE
  FROM PACIENTS
  WHERE pacient_id = \$1
  `;

return  db.result(query, pacient_id)
};

/**********************************************
Queries for /appointments endpoint
***********************************************/
let getAllAppointments = () => {
  let query =
  `
  SELECT *
  FROM APPOINTMENTS
   `;

  return  db.any(query);

};

let getAppointment = (doctor_id) => {
  let query =
  `
  SELECT *
  FROM APPOINTMENTS
  WHERE doctor_id = \$1
  `;

  return db.one(query, doctor_id);
};

let createAppointment = (body) => {
  let query =
  `
  INSERT INTO APPOINTMENTS (pacient_id, doctor_id, medical_agreement_id, appointment_day, appointment_hour)
  VALUES (\${pacient_id}, \${doctor_id}, \${medical_agreement_id}, \${appointment_day}, \${appointment_hour})
  `;

  db.none( query, body);
};

let updateAppointment = (appointment_id, body) => {
  let query =
  `
  UPDATE APPOINTMENTS
  SET pacient_appointment_id = \${pacient_appointment_id} , doctor_appointment_id = \${doctor_appointment_id}, medical_agreement_appointment_id = \${medical_agreement_appointment_id}, appointment_day = \${appointment_day}, appointment_hour = \${appointment_hour}, confirmed = \${confirmed}, canceled = \${canceled}
  WHERE appointment_id = ${appointment_id}
  `;

  return db.result(query, body);
};

let deleteAppointment = (appointment_id) => {
  let query =
  `
  DELETE
  FROM APPOINTMENTS
  WHERE appointment_id = \$1
  `;

return  db.result(query, appointment_id)
};

module.exports = {
  getAllMedicalAgreements:  getAllMedicalAgreements,
  getMedicalAgreement:      getMedicalAgreement,
  createMedicalAgreement:   createMedicalAgreement,
  updateMedicalAgreement:   updateMedicalAgreement,
  deleteMedicalAgreement:   deleteMedicalAgreement,
  getAllDoctors:            getAllDoctors,
  getFreeDoctors:            getFreeDoctors,
  getDoctor:                getDoctor,
  createDoctor:            createDoctor,
  verifyDoctor:             verifyDoctor,
  updatedDoctor:            updateDoctor,
  deletedDoctor:            deleteDoctor,
  getAllOffices:            getAllOffices,
  getOffice:                getOffice,
  createOffice:             createOffice,
  updateOffice:             updateOffice,
  deleteOffice:             deleteOffice,
  getAllPacients:           getAllPacients,
  getPacient:               getPacient,
  getPacientWithEmail:      getPacientWithEmail,
  createPacient:            createPacient,
  verifyPacient:           verifyPacient,
  updatePacient:            updatePacient,
  deletePacient:            deletePacient,
  getAllAppointments:       getAllAppointments,
  getAppointment:           getAppointment,
  createAppointment:        createAppointment,
  updateAppointment:        updateAppointment,
  deleteAppointment:        deleteAppointment
};
