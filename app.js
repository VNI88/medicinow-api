import express from 'express';
import db from './db/db';

//Setting express app
const app = express();

//get all appointments
app.get('/api/v1/appointments', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'appointments retrieved with success',
    appointments: db
  })
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
