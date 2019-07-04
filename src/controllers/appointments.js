let database = require ('../db/queries.js');

let  allAppointments = async (req, res) => {
try{
    let data = await database.getAllAppointments()
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

let oneAppointment = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.getAppointment(id)

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

let buildAppointment = async (req, res) => {
  try{
    let body = req.body;
    let data = await database.createAppointment(body)

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

let modifyAppointment = async (req, res) => {
  try{
    let id = req.params.id;
    let body = req.body;
    let data = await database.updateAppointment(id, body)

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

let excludeAppointment = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.deleteAppointment(id)

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
  oneAppointment:      oneAppointment,
  modifyAppointment:   modifyAppointment,
  buildAppointment:    buildAppointment,
  excludeAppointment:  excludeAppointment
}
