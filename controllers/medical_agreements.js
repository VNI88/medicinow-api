/*eslint-disable class-methods-use-this*/
import db from '../db/queries.js'


const getAllMedicalAgreements = async (req, res) => {
   let query =  await db.getAllMedicalAgreements;

  console.log(query);
}
  // getAppointment(req, res) {
  //   let id = parseInt(req.params.id, 10);
  //   db.map((appointment) => {
  //     if(appointment.id === id) {
  //       return res.status(200).send({
  //         success: 'true',
  //         message: 'Appointment retrieved with success',
  //         appointment
  //       });
  //     }
  //   });
  //   return res.status(404).send({
  //     success: 'false',
  //     message: 'Appointment not found try again'
  //   });
  // }
  //
  // createAppointment(req, res) {
  //   const keys = [ 'doctor', 'proficiency', 'pacient', 'time', 'date'];
  //
  //   for(let index = 0; index < keys.length; index++) {
  //     if(!req.body[keys[index]]) {
  //       return res.status(400).send({
  //         success: 'false',
  //         message: `${keys[index]} is required`
  //       });
  //     }
  //   }
  //
  //   let appointment = {
  //     id: db.length + 1,
  //     doctor: req.body.doctor,
  //     proficiency: req.body.proficiency,
  //     pacient: req.body.pacient,
  //     time: req.body.time,
  //     date: req.body.date
  //   }
  //
  //   db.push(appointment);
  //   return res.status(200).send({
  //     success: 'true',
  //     message: 'Appointment created with success',
  //     appointment
  //   });
  // }
  //
  // updateAppointment(req, res) {
  //   const keys = [ 'doctor', 'proficiency', 'pacient', 'time', 'date'];
  //
  //   for(let index = 0; index < keys.length; index++) {
  //     if(!req.body[keys[index]]) {
  //       return res.status(400).send({
  //         success: 'false',
  //         message: `${keys[index]} is required`
  //       });
  //     }
  //   }
  //
  //   let appointment = {
  //     id: db.length + 1,
  //     doctor: req.body.doctor,
  //     proficiency: req.body.proficiency,
  //     pacient: req.body.pacient,
  //     time: req.body.time,
  //     date: req.body.date
  //   }
  //
  //   db.push(appointment);
  //   return res.status(200).send({
  //     success: 'true',
  //     message: 'Appointment updated with success',
  //     appointment
  //   });
  // }
  //
  // deleteAppointment(req, res){
  //   const id = parseInt(req.params.id, 10);
  //   let appointmentFound;
  //   let itemIndex;
  //   db.map((appointment, index) => {
  //     if (appointment.id === id) {
  //       appointmentFound = appointment;
  //       itemIndex = index;
  //     }
  //   });
  //
  //   if (!todoFound) {
  //     return res.status(404).send({
  //       success: 'false',
  //       message: 'Appointment not found',
  //     });
  //   }
  //   db.splice(itemIndex, 1);
  //
  //   return res.status(200).send({
  //     success: 'true',
  //     message: 'Appointment deleted successfuly',
  //   });
  // }



export default getAllMedicalAgreements;
