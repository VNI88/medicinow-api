/*eslint-disable class-methods-use-this*/
import db from '../db/db'

class AppointmentsController {
  getAllAppointments(req, res) {
    pool.connect((err, client, done) => {
      let query = db.getAllAppointments;

      client.query(query, (error, result) => {
        done();

        if (error){
          res.status(400).json({error})
        }

        if(result.rows) < '1') {
          res.status(404).send({
            status: 'Failure',
            message: 'No doctors found'
          });
        } else {
          res.status(200).send({
            status:'Success',
            message: 'Doctors listed with success',
            doctors: result.rows
          });
        }
      });
    });
    // res.status(200).send({
    //   success: 'true',
    //   message: 'Appointments retrieved with success',
    //   appointments: db
    // })
  }

  getAppointment(req, res) {
    let id = parseInt(req.params.id, 10);
    db.map((appointment) => {
      if(appointment.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'Appointment retrieved with success',
          appointment
        });
      }
    });
    return res.status(404).send({
      success: 'false',
      message: 'Appointment not found try again'
    });
  }

  createAppointment(req, res) {
    const keys = [ 'doctor', 'proficiency', 'pacient', 'time', 'date'];

    for(let index = 0; index < keys.length; index++) {
      if(!req.body[keys[index]]) {
        return res.status(400).send({
          success: 'false',
          message: `${keys[index]} is required`
        });
      }
    }

    let appointment = {
      id: db.length + 1,
      doctor: req.body.doctor,
      proficiency: req.body.proficiency,
      pacient: req.body.pacient,
      time: req.body.time,
      date: req.body.date
    }

    db.push(appointment);
    return res.status(200).send({
      success: 'true',
      message: 'Appointment created with success',
      appointment
    });
  }

  updateAppointment(req, res) {
    const keys = [ 'doctor', 'proficiency', 'pacient', 'time', 'date'];

    for(let index = 0; index < keys.length; index++) {
      if(!req.body[keys[index]]) {
        return res.status(400).send({
          success: 'false',
          message: `${keys[index]} is required`
        });
      }
    }

    let appointment = {
      id: db.length + 1,
      doctor: req.body.doctor,
      proficiency: req.body.proficiency,
      pacient: req.body.pacient,
      time: req.body.time,
      date: req.body.date
    }

    db.push(appointment);
    return res.status(200).send({
      success: 'true',
      message: 'Appointment updated with success',
      appointment
    });
  }

  deleteAppointment(req, res){
    const id = parseInt(req.params.id, 10);
    let appointmentFound;
    let itemIndex;
    db.map((appointment, index) => {
      if (appointment.id === id) {
        appointmentFound = appointment;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'Appointment not found',
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'Appointment deleted successfuly',
    });
  }
}

const appointmentsController = new AppointmentsController();
export default appointmentsController;
