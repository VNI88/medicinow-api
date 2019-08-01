let database = require ('../db/queries.js');

let  index = async (req, res) => {
try{
    let data = await database.getAllAppointments()
    // 201 Status code means that something was created
    return res.status(201).json({
     status: 'success',
     data: data,
     message: 'Retrieved all appointments'
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
    let data = await database.getAppointment(id)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved appointment of id: ${id}`
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
    let data = await database.createAppointment(body)

    return res.status(201).json({
     status: 'success',
     message: `Created appointment with success.`
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
    let data = await database.updateAppointment(id, body)

    return res.status(201).json({
     status: 'success',
     message: `Updated ${data.rowCount} appointments.`
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
    let data = await database.deleteAppointment(id)

    if (data.rowCount <=  0) {
     res.status(404)
      .json({
        status: 'failed',
        message: `Removed ${data.rowCount} appointment.`
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `Removed ${data.rowCount} appointment.`
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
  index:    index,
  show:     show,
  update:   update,
  create:   create,
  destroy:  destroy
}
