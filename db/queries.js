let promise = require('bluebird');

let options = {
  //Initislized options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://5432/medicinow_api';
const db = pgp(connectionString);

let getAllMedicalAgreements = (req, res, next) => {
  db.any(
    `SELECT *
     FROM MEDICAL_AGREEMENTS `
  )
  .then ( data => {
    res.status(200)
    .json({
      status: 'success',
      data:data:
      message: 'Retrieved all medical medical_agreements'
    });
  })
  .catch (err => {
    return next(err);
  });
}
module.exports = {
  getAllMedicalAgreements: getAllMedicalAgreements,
  getMedicalAgreement: getMedicalAgreement,
  createMedicalAgreement: createMedicalAgreement,
  updateMedicalAgreement: updateMedicalAgreement,
  deleteMedicalAgreement: deleteMedicalAgreement
};
