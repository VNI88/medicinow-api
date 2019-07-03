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

let getMedicalAgreement = (req, res, next) => {

  let medical_agreement_id = req.params.id
  db.many(
    `
    SELECT brand, plan
    FROM MEDICAL_AGREEMENTS
    WHERE id = $1
    `,

    medical_agreement_id
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

let createMedicalAgreement = (req, res, next) => {
  console.log(req.body)
  db.none(
    `
    INSERT INTO MEDICAL_AGREEMENTS (brand, plan)
    VALUES (\${brand}, \${plan})
    `,
    req.body
  )
  .then ( data => {
   res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one medical agreement.'
    });
  })
  .catch (err => {
    return next(err);
  });
};

let updateMedicalAgreement = (req, res, next) => {

  let medical_agreement_id = parseInt (req.params.id)
  db.none(
    `
    UPDATE MEDICAL_AGREEMENTS
    SET brand = \${brand} , plan = \${plan}
    WHERE id = ${medical_agreement_id}
    `,

    req.body
  )
  .then ( data => {
   res.status(200)
    .json({
      status: 'success',
      message: 'Updated medical agreement.'
    });
  })
  .catch (err => {
    return next(err);
  });
};

let deleteMedicalAgreement = (req, res, next) => {

  let medical_agreement_id = parseInt (req.params.id)
  db.result(
    `
    DELETE
    FROM MEDICAL_AGREEMENTS
    WHERE id = \$1
    `,

    medical_agreement_id
  )
  .then ( result => {
    if (result.rowCount <=  0) {
     res.status(404)
      .json({
        status: 'failed',
        message: `Removed ${result.rowCount} medical agreement.`
      });
    } else {
      res.status(200)
       .json({
         status: 'success',
         message: `Removed ${result.rowCount} medical agreement.`
       });
    }
  })
  .catch (err => {
    return next(err);
  });
};

module.exports = {
  getAllMedicalAgreements: getAllMedicalAgreements,
  getMedicalAgreement: getMedicalAgreement,
  createMedicalAgreement: createMedicalAgreement,
  updateMedicalAgreement: updateMedicalAgreement,
  deleteMedicalAgreement: deleteMedicalAgreement
};
