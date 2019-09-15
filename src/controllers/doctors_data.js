let database = require ('../db/queries.js');
let {generateToken, encryptPass} = require('../middleware/auth.js');

let create = async (req, res) => {
  try{
    let body = req.body;
    let doctorData = await database.createDoctorData(body);

    return res.status(201).json({
     status: 'success',
     message: 'Doctor data registered with success.'
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let update = async (req, res) => {
  try{
    let body = req.body;
    let doctorData = await database.updateDoctorDataMedicalAgreement(body);

    return res.status(201).json({
     status: 'success',
     message: 'Doctor medical agreement registered with success.'
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let show = async (req, res) => {
  try{
    let param = req.params;
    let doctorData = await database.getDoctorData(param);

    return res.status(201).json({
     status: 'success',
     data: doctorData,
     message: 'Data retrieved with success.'
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

module.exports = {
  create:           create,
  update:           update,
  show:           show
}
