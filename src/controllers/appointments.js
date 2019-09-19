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

let showDoctorDayList = async (req, res) => {
  try{
    let params = req.params;
    let data = await database.getDoctorDayAppointments(params)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved the appointments of the day`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let showDoctorCanceledList = async (req, res) => {
  try{
    let params = req.params;
    let data = await database.getDoctorCanceledAppointments(params)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved canceled appointments`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let showDoctorPastList = async (req, res) => {
  try{
    let params = req.params;
    let data = await database.getDoctorPastAppointments(params)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved past appointments`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let showDoctorNextList = async (req, res) => {
  try{
    let params = req.params;
    let data = await database.getDoctorNextAppointments(params)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved future appointments`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let showPacientPastList = async (req, res) => {
  try{
    let params = req.params;
    let data = await database.getPacientPastAppointments(params)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved past appointments`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let showPacientNextList = async (req, res) => {
  try{
    let params = req.params;
    let data = await database.getPacientNextAppointments(params)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved future appointments`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let showPacientDayList = async (req, res) => {
  try{
    let params = req.params;
    let data = await database.getPacientDayAppointments(params)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved the appointments of the day`
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
     data: data,
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
    let appointment_id = req.params;
    let data = await database.updateAppointment(appointment_id)

    return res.status(201).json({
     status: 'success',
     message: `Updated ${data.rowCount}appointments.`
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
  index:              index,
  show:               show,
  showDoctorDayList:  showDoctorDayList,
  showDoctorCanceledList:  showDoctorCanceledList,
  showDoctorPastList:  showDoctorPastList,
  showDoctorNextList:  showDoctorNextList,
  showPacientDayList:  showPacientDayList,
  showPacientNextList:  showPacientNextList,
  showPacientPastList:  showPacientPastList,
  update:             update,
  create:             create,
  destroy:            destroy
}
