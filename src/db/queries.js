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
  // if ( queryParameter ==  null ) {

    let query =
    `
    SELECT *
    FROM MEDICAL_AGREEMENTS
     `;
  //
  //   return  db.any(query);
  // }
  // else {
  //   let query =
  //   `
  //   SELECT *
  //   FROM MEDICAL_AGREEMENTS
  //   WHERE
  //    `;

    return  db.any(query);
  // }
};

let getMedicalAgreement = (id) => {
  let query =
  `
  SELECT *
  FROM MEDICAL_AGREEMENTS
  WHERE id = \$1
  `;

  return db.many(query, id);
};

let createMedicalAgreement = (body) => {
  let query =
  `
  INSERT INTO MEDICAL_AGREEMENTS (brand, plan)
  VALUES (\${brand}, \${plan})
  `;

  db.none( query, body);
};

let updateMedicalAgreement = (id, body) => {
  let query =
  `
  UPDATE MEDICAL_AGREEMENTS
  SET brand = \${brand} , plan = \${plan}
  WHERE id = ${id}
  `;

  return db.result(query, body);
};

let deleteMedicalAgreement = (id) => {
  let query =
  `
  DELETE
  FROM MEDICAL_AGREEMENTS
  WHERE id = \$1
  `;

return  db.result(query, id)
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
  WHERE id = \$1
  `;

  return db.many(query, id);
};

let getFreeDoctors = (body) => {
  let query =
  `
  SELECT first_name, last_name, office_id
  FROM DOCTORS
  WHERE doctor_id NOT IN
                  (SELECT doctor_id
                  FROM APPOINTMENTS
                  WHERE appointment_day = \${appointment_day} AND  appointment_hour  = \${appointment_hour});
  `;

  return db.many(query, body);
};

let createDoctor = (body) => {
  let query =
  `
  INSERT INTO DOCTORS (last_name, first_name, telephone, email, password, crm, speciality)
  VALUES (\${last_name}, \${first_name}, \${telephone}, \${email}, \${password}, \${crm}, \${speciality})
  RETURNING id
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

let updateDoctor = (id, body) => {
  let query =
  `
  UPDATE DOCTORS
  SET first_name = \${first_name} , last_name = \${last_name}, telephone = \${telephone}, email = \${email}, password = \${password}
  WHERE id = ${id}
  `;

  return db.result(query, body);
};

let deleteDoctor = (id) => {
  let query =
  `
  DELETE
  FROM DOCTORS
  WHERE id = \$1
  `;

return  db.result(query, id)
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

let getOffice = (id) => {
  let query =
  `
  SELECT *
  FROM OFFICES
  WHERE id = $1
  `;

  return db.many(query, id);
};

let createOffice = (body) => {
  let query =
  `
  INSERT INTO OFFICES (brand, plan)
  VALUES (\${brand}, \${plan})
  `;

  db.none( query, body);
};

let updateOffice = (id, body) => {
  let query =
  `
  UPDATE OFFICES
  SET brand = \${brand} , plan = \${plan}
  WHERE id = ${id}
  `;

  return db.result(query, body);
};

let deleteOffice = (id) => {
  let query =
  `
  DELETE
  FROM OFFICES
  WHERE id = \$1
  `;

return  db.result(query, id)
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

let getPacient = (id) => {
  let query =
  `
  SELECT *
  FROM PACIENTS
  WHERE id = $1
  `;

  return db.one(query, id);
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
  RETURNING id
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

let updatePacient = (id, body) => {
  let query =
  `
  UPDATE PACIENTS
  SET first_name = \${first_name} , last_name = \${last_name}, telephone = \${telephone}, email = \${email}, password = \${password}
  WHERE id = ${id}
  `;

  return db.result(query, body);
};

let deletePacient = (id) => {
  let query =
  `
  DELETE
  FROM PACIENTS
  WHERE id = \$1
  `;

return  db.result(query, id)
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

let getAppointment = (id) => {
  let query =
  `
  SELECT *
  FROM APPOINTMENTS
  WHERE id = $1
  `;

  return db.one(query, id);
};

let createAppointment = (body) => {
  let query =
  `
  INSERT INTO APPOINTMENTS (pacient_id, doctor_id, medical_agreement_id, appointment_day, appointment_hour)
  VALUES (\${pacient_id}, \${doctor_id}, \${medical_agreement_id}, \${appointment_day}, \${appointment_hour})
  `;

  db.none( query, body);
};

let updateAppointment = (id, body) => {
  let query =
  `
  UPDATE APPOINTMENTS
  SET pacient_id = \${pacient_id} , doctor_id = \${doctor_id}, medical_agreement_id = \${medical_agreement_id}, appointment_day = \${appointment_day}, appointment_hour = \${appointment_hour}, confirmed = \${confirmed}, canceled = \${canceled}
  WHERE id = ${id}
  `;

  return db.result(query, body);
};

let deleteAppointment = (id) => {
  let query =
  `
  DELETE
  FROM APPOINTMENTS
  WHERE id = \$1
  `;

return  db.result(query, id)
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
