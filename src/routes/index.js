import db from '../db/queries';

const express = require('express');
const medical_agreements = require('../controllers/medical_agreements.js');
const offices = require('../controllers/offices.js');
const doctors = require('../controllers/doctors.js');
const pacients = require('../controllers/pacients.js');
const appointments = require('../controllers/appointments.js');
const authentication = require('../controllers/authentication.js');
const auth = require('../middleware/auth.js');

let router = express.Router();

/**********************************************
Controller: Medical Agreements
***********************************************/

//GET all medical agreements
router.get('/api/v1/medical_agreements', medical_agreements.index);

//GET just one medical agreement
router.get('/api/v1/medical_agreements/:brand', medical_agreements.show);

// POST a medical agreement
router.post('/api/v1/medical_agreements', auth.verifyToken, medical_agreements.create);

//UPDATE a medical agreement
router.put('/api/v1/medical_agreements/:id', medical_agreements.update);

//DELETE one medical_agreement from database
router.delete('/api/v1/medical_agreements/:id', medical_agreements.destroy);

/**********************************************
Controller: Doctors
***********************************************/

// //GET all doctors
// router.get('/api/v1/doctors',  doctors.index);

//GET just one doctor
router.get('/api/v1/doctors/:doctor_id', doctors.show);

//GET just doctors with free agenda
router.get('/api/v1/doctors/:appointment_day/:appointment_hour', doctors.showFreeDoctors);

// POST a doctor
router.post('/api/v1/doctors', doctors.create);

//UPDATE a doctor
router.put('/api/v1/doctors/:doctor_id', auth.verifyToken, doctors.update);

//DELETE one doctor from database
router.delete('/api/v1/doctors/:doctor_id', auth.verifyToken, doctors.destroy);

/**********************************************
Controller: Offices
***********************************************/

//GET all offices
router.get('/api/v1/offices',  offices.index);

//GET just one office
router.get('/api/v1/offices/:id', offices.show);

// POST a office
router.post('/api/v1/offices', auth.verifyToken, offices.create);

//UPDATE a office
router.put('/api/v1/offices/:id', auth.verifyToken, offices.update);

//DELETE one office from database
router.delete('/api/v1/offices/:id', auth.verifyToken, offices.destroy);

/**********************************************
Controller: Pacients
***********************************************/

//GET all pacients
router.get('/api/v1/pacients',  auth.verifyToken, pacients.index);

//GET just one pacient
router.get('/api/v1/pacients/:email', auth.verifyToken, pacients.show);

// POST a pacient
router.post('/api/v1/pacients', pacients.create);

//UPDATE a pacient
router.put('/api/v1/pacients/:id', auth.verifyToken, pacients.update);

//DELETE one pacient from database
router.delete('/api/v1/pacients/:id', auth.verifyToken, pacients.destroy);

/**********************************************
Controller: Appointments
***********************************************/

//GET all appointments
router.get('/api/v1/appointments',  auth.verifyToken, appointments.index);

//GET just one appointment
router.get('/api/v1/appointments/:id', auth.verifyToken, appointments.show);

// POST a appointment
router.post('/api/v1/appointments', auth.verifyToken, appointments.create);

//UPDATE a appointment
router.put('/api/v1/appointments/:id', auth.verifyToken, appointments.update);

//DELETE one appointment from database
router.delete('/api/v1/appointments/:id', auth.verifyToken, appointments.destroy);

/**********************************************
Controller: authentication
***********************************************/

//POST token
router.post('/api/v1/sign_in', authentication.create)

module.exports =  router;
