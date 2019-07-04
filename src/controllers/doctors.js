let database = require ('../db/queries.js');

let  allDoctors = async (req, res) => {
try{
    let data = await database.getAllDoctors()
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

let oneDoctor = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.getDoctor(id)

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

let buildDoctor = async (req, res) => {
  try{
    let body = req.body;
    let data = await database.createDoctor(body)

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

let modifyDoctor = async (req, res) => {
  try{
    let id = req.params.id;
    let body = req.body;
    let data = await database.updateDoctor(id, body)

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

let excludeDoctor = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.deleteDoctor(id)

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
  allDoctors:     allDoctors,
  oneDoctor:      oneDoctor,
  buildDoctor:    buildDoctor,
  modifyDoctor:   modifyDoctor,
  excludeDoctor:  excludeDoctor
}
