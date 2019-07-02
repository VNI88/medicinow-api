import express from 'express';
import db from '../db/queries';
import { getAllMedicalAgreements } from '../controllers/medical_agreements';

const router = express.Router();

//GET all appointments
router.get('/api/v1/medical_agreements', db.getAllMedicalAgreements);

// //POST an appointment
// router.post('/api/v1/appointments', appointmentsController.createAppointment);
//
// //GET just one appointment
// router.get('/api/v1/appointments/:brand_name', appointmentsController.getAppointment);
//

//GET just one appointment
router.get('/api/v1/medical_agreements/:id', db.getMedicalAgreement);

// //DELETE one appointment from database
// router.delete('/api/v1/appointments/:id', appointmentsController.deleteAppointment);
//
// //UPDATE an appointment
// router.put('/api/v1/appointments/:id', appointmentsController.updateAppointment);

export default router;
