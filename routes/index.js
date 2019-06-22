import express from 'express';
import db from '../db/db';
import appointmentsController from '../controllers/appointments'

const router = express.Router();

//GET all appointments
router.get('/api/v1/appointments', appointmentsController.getAllAppointments);

//POST an appointment
router.post('/api/v1/appointments', appointmentsController.createAppointment);

//GET just one appointment
router.get('/api/v1/appointments/:id', appointmentsController.getAppointment);

//DELETE one appointment from database
router.delete('/api/v1/appointments/:id', appointmentsController.deleteAppointment);

//UPDATE an appointment
router.put('/api/v1/appointments/:id', appointmentsController.updateAppointment);

export default router;
