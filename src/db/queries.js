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
  database: process.env.DB_DATABASE

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
  SELECT brand, plan
  FROM MEDICAL_AGREEMENTS
  WHERE id = $1
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
  SELECT brand, plan
  FROM DOCTORS
  WHERE id = $1
  `;

  return db.many(query, id);
};

let createDoctor = (body) => {
  let query =
  `
  INSERT INTO DOCTORS (brand, plan)
  VALUES (\${brand}, \${plan})
  `;

  db.none( query, body);
};

let updateDoctor = (id, body) => {
  let query =
  `
  UPDATE DOCTORS
  SET brand = \${brand} , plan = \${plan}
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

  return  db.any(query);

};

let getOffice = (id) => {
  let query =
  `
  SELECT brand, plan
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
  SELECT brand, plan
  FROM PACIENTS
  WHERE id = $1
  `;

  return db.many(query, id);
};

let createPacient = (body) => {
  let query =
  `
  INSERT INTO PACIENTS (brand, plan)
  VALUES (\${brand}, \${plan})
  `;

  db.none( query, body);
};

let updatePacient = (id, body) => {
  let query =
  `
  UPDATE PACIENTS
  SET brand = \${brand} , plan = \${plan}
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
  SELECT brand, plan
  FROM APPOINTMENTS
  WHERE id = $1
  `;

  return db.many(query, id);
};

let createAppointment = (body) => {
  let query =
  `
  INSERT INTO APPOINTMENTS (brand, plan)
  VALUES (\${brand}, \${plan})
  `;

  db.none( query, body);
};

let updateAppointment = (id, body) => {
  let query =
  `
  UPDATE APPOINTMENTS
  SET brand = \${brand} , plan = \${plan}
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
  getAllDoctors:           getAllDoctors,
  getDoctor:               getDoctor,
  createdDoctor:            createDoctor,
  updatedDoctor:            updateDoctor,
  deletedDoctor:            deleteDoctor,
  getAllOffices:            getAllOffices,
  getOffice:                getOffice,
  createOffice:             createOffice,
  updateOffice:             updateOffice,
  deleteOffice:             deleteOffice,
  getAllPacients:           getAllPacients,
  getPacient:               getPacient,
  createPacient:            createPacient,
  updatePacient:            updatePacient,
  deletePacient:            deletePacient,
  getAllAppointments:       getAllAppointments,
  getAppointment:           getAppointment,
  createAppointment:        createAppointment,
  updateAppointment:        updateAppointment,
  deleteAppointment:        deleteAppointment
};
