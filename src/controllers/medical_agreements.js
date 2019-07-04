let database = require ('../db/queries.js');

let  allMedicalAgreement = async (req, res) => {
try{
    let data = await database.getAllMedicalAgreements()
    // 201 Status code means that something was created
    return res.status(201).json({
     status: 'success',
     data: data,
     message: 'Retrieved all medical agreements'
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let oneMedicalAgreement = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.getMedicalAgreement(id)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved medical agreement of id: ${id}`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let buildMedicalAgreement = async (req, res) => {
  try{
    let body = req.body;
    let data = await database.createMedicalAgreement(body)

    return res.status(201).json({
     status: 'success',
     message: `Inserted medical agreement with success.`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let modifyMedicalAgreement = async (req, res) => {
  try{
    let id = req.params.id;
    let body = req.body;
    let data = await database.updateMedicalAgreement(id, body)

    return res.status(201).json({
     status: 'success',
     message: `Updated ${data.rowCount} medical agreements.`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
}

let excludeMedicalAgreement = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.deleteMedicalAgreement(id)

    if (data.rowCount <=  0) {
     res.status(404)
      .json({
        status: 'failed',
        message: `Removed ${data.rowCount} medical agreement.`
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `Removed ${data.rowCount} medical agreement.`
      });
    }
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
}

module.exports = {
  allMedicalAgreement: allMedicalAgreement,
  oneMedicalAgreement: oneMedicalAgreement,
  modifyMedicalAgreement: modifyMedicalAgreement,
  buildMedicalAgreement: buildMedicalAgreement,
  excludeMedicalAgreement: excludeMedicalAgreement
}
