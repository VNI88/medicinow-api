let promise = require('bluebird');

let options = {
  //Initialized options
  promiseLib: promise

};

const pgp = require('pg-promise')(options);

const config = {
  user: 'vinicius',
  password: 'pass123',
  database: 'medicinow_api',

};


const db = pgp(config);

let getAllMedicalAgreements = () => {
  let query =
  `
  SELECT *
  FROM MEDICAL_AGREEMENTS
   `;

  return  db.any(query);

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

module.exports = {
  getAllMedicalAgreements: getAllMedicalAgreements,
  getMedicalAgreement: getMedicalAgreement,
  createMedicalAgreement: createMedicalAgreement,
  updateMedicalAgreement: updateMedicalAgreement,
  deleteMedicalAgreement: deleteMedicalAgreement
};
