let promise = require('bluebird');

let options = {
  //Initialized options
  promiseLib: promise

};

const pgp = require('pg-promise')(options);

const config = {
  user: 'vini',
  password: 'pass123',
  database: 'medicinow_api',

};


const db = pgp(config);

let getAllMedicalAgreements = (req, res, next) => {
  db.any(
    `SELECT *
     FROM MEDICAL_AGREEMENTS`
  )
  .then ( data => {
   res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved all medical agreements'
    });
  })
  .catch (err => {
    return next(err);
  });
};

let getAllMedicalAgreementsPlans = (req, res, next) => {

  let brandid = req.params.id
  db.many(
    `
    SELECT brand, plan
    FROM MEDICAL_AGREEMENTS
    WHERE id = $1
    `,

    brandid
  )
  .then ( data => {
   res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved one medical agreement with id.'
    });
  })
  .catch (err => {
    return next(err);
  });
};

module.exports = {
  getAllMedicalAgreements: getAllMedicalAgreements,
  getMedicalAgreement: getAllMedicalAgreementsPlans,
  // getMedicalAgreement: getMedicalAgreement,
  // createMedicalAgreement: createMedicalAgreement,
  // updateMedicalAgreement: updateMedicalAgreement,
  // deleteMedicalAgreement: deleteMedicalAgreement
};
