let database = require ('../db/queries.js');
let {generateToken, encryptPass} = require('../middleware/auth.js');

let  index = async (req, res) => {
try{
    let data = await database.getAllDoctors()
    // 201 Status code means that something was created
    return res.status(201).json({
     status: 'success',
     data: data,
     message: 'Retrieved all doctors'
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
    let id = req.params.id;
    let data = await database.getDoctor(id)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved doctor of id: ${id}`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let showFreeDoctors = async (req, res) => {
  try{
    let queryParameter = req.params;
    let data = await database.getFreeDoctors(queryParameter)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved doctors with free calendar days.`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let create = async (req, res) => {
  try{
    let body = req.body;
    body.password = await encryptPass(body.password);
    let data = await database.createDoctor(body);
    
    let userId = {
      id: data.doctor_id
    };

    return res.status(201).json({
     status: 'success',
     token: generateToken(userId),
     message: 'Doctor registered with success.'
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
    let id = req.params.id;
    let body = req.body;
    let data = await database.updateDoctor(id, body)

    return res.status(201).json({
     status: 'success',
     message: `Updated ${data.rowCount} doctor.`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
}

let destroy = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.deleteDoctor(id)

    if (data.rowCount <=  0) {
     res.status(404)
      .json({
        status: 'failed',
        message: `Removed ${data.rowCount} doctor.`
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `Removed ${data.rowCount} doctor.`
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
  index:            index,
  show:             show,
  showFreeDoctors:  showFreeDoctors,
  create:           create,
  update:           update,
  destroy:          destroy
}
