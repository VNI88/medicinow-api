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
    message: 'appointments retrieved with success',
    appointments: db
  })
});

//create an appointment
app.post('/api/v1/appointments', (req, res) => {
  const keys = [ 'doctor', 'proficiency', 'pacient', 'time', 'date'];

  for(let index = 0; index < keys.length; index++) {
    console.log(keys[index]);
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
    message: 'appointment created with success',
    appointment
  })
});

//getting just one appointment
app.get('api/v1/appointments/:id', (req, res) => {
  let id = parseInt(req.params.id, 10);
  console.log(id);
  db.map((appointment) => {
    if(appointment.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'appointment retrieved with success',
        appointment,
      });
    } 
  });
  return res.status(404).send({
    success: 'false',
    message: 'appointment not found try again',
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
