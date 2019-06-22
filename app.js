import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
//Setting express app
const app = express();

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get all appointments
app.get('/api/v1/appointments', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Appointments retrieved with success',
    appointments: db
  })
});

//POST an appointment
app.post('/api/v1/appointments', (req, res) => {
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
  })
});

//GET just one appointment
app.get('/api/v1/appointments/:id', (req, res) => {
  let id = parseInt(req.params.id, 10);
  console.log(id);
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
});

//DELETE one appointment from database
app.delete('/api/v1/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  db.map((appointment, index) => {
    if(appointment.id === id) {
      db.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Appointment deleted with success'
      });
    }
  });
  return res.status(400).send({
    success:'false',
    message:'Appointment don\'t exist'
  });
});

// app.put('/api/v1/todos/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   let todoFound;
//   let itemIndex;
//   db.map((todo, index) => {
//     if (todo.id === id) {
//       todoFound = todo;
//       itemIndex = index;
//     }
//   });
// 
//   if (!todoFound) {
//     return res.status(404).send({
//       success: 'false',
//       message: 'todo not found',
//     });
//   }
// 
//   if (!req.body.title) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'title is required',
//     });
//   } else if (!req.body.description) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'description is required',
//     });
//   }
// 
//   const updatedTodo = {
//     id: todoFound.id,
//     title: req.body.title || todoFound.title,
//     description: req.body.description || todoFound.description,
//   };
// 
//   db.splice(itemIndex, 1, updatedTodo);
// 
//   return res.status(201).send({
//     success: 'true',
//     message: 'todo added successfully',
//     updatedTodo,
//   });
// });
//Update an appointment
app.put('/api/v1/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let appointmentFound;
  let itemIndex;
  
  db.map((appointment, index) => {
    if(appointment.id === id){
      appointmentFound = appointment;
      itemIndex = index;
    }
  });
    
  if(!appointmentFound) {
    return res.status(404).send({
      success: 'false',
      message: 'Appointment not found'
    });
  }
  
  const keys = [ 'doctor', 'proficiency', 'pacient', 'time', 'date'];
  console.log(req.body)
  if(!req.body.doctor) {
    return res.status(400).send({
      success: 'false',
      message: 'Doctor is required'
    })} else if(!req.body.date) {
      return res.status(400).send({
        success: 'false',
        message: 'Date is required'
    })} else if(!req.body.time) {
    return res.status(400).send({
      success: 'false',
      message: 'Time is required'
    })};
    

  
  const updateAppointment = {
    id: appointmentFound.id,
    doctor: req.body.doctor || appointmentFound.doctor,
    proficiency: req.body.proficiency ||   appointmentFound.proficiency,
    pacient: req.body.pacient || appointmentFound.pacient,
    time: req.body.time || appointmentFound.time,
    date: req.body.date || appointmentFound.date
  };
  
  db.splice(itemIndex,1, updateAppointment);
  
  return res.status(200).send({
    errsuccess: 'true',
    message: 'Appointment updated with success',
    updateAppointment
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
