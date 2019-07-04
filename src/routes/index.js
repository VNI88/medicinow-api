const express = require('express');
import db from '../db/queries';
const controller_ma = require('../controllers/medical_agreements.js')
const controller_off = require('../controllers/offices.js')
const controller_doc = require('../controllers/doctors.js')
const controller_pac = require('../controllers/pacients.js')
const controller_app = require('../controllers/appointments.js')


let router = express.Router();
/**********************************************
Controller: Medical Agreements
***********************************************/

//GET all medical agreements
router.get('/api/v1/medical_agreements',  controller_ma.allMedicalAgreements);

//GET just one medical agreement
router.get('/api/v1/medical_agreements/:id', controller_ma.oneMedicalAgreement);

// POST a medical agreement
router.post('/api/v1/medical_agreements', controller_ma.buildMedicalAgreement);

//UPDATE a medical agreement
router.put('/api/v1/medical_agreements/:id', controller_ma.modifyMedicalAgreement);

//DELETE one medical_agreement from database
router.delete('/api/v1/medical_agreements/:id', controller_ma.excludeMedicalAgreement);

/**********************************************
Controller: Doctors
***********************************************/

//GET all doctors
router.get('/api/v1/doctors',  controller_doc.allDoctors);

//GET just one doctor
router.get('/api/v1/doctors/:id', controller_doc.oneDoctor);

// POST a doctor
router.post('/api/v1/doctors', controller_doc.buildDoctor);

//UPDATE a doctor
router.put('/api/v1/doctors/:id', controller_doc.modifyDoctor);

//DELETE one doctor from database
router.delete('/api/v1/doctors/:id', controller_doc.excludeDoctor);

/**********************************************
Controller: Offices
***********************************************/

//GET all offices
router.get('/api/v1/offices',  controller_off.allOffices);

//GET just one office
router.get('/api/v1/offices/:id', controller_off.oneOffice);

// POST a office
router.post('/api/v1/offices', controller_off.buildOffice);

//UPDATE a office
router.put('/api/v1/offices/:id', controller_off.modifyOffice);

//DELETE one office from database
router.delete('/api/v1/offices/:id', controller_off.excludeOffice);

/**********************************************
Controller: Pacients
***********************************************/

//GET all pacients
router.get('/api/v1/pacients',  controller_pac.Pacients);

//GET just one pacient
router.get('/api/v1/pacients/:id', controller_pac.onePacient);

// POST a pacient
router.post('/api/v1/pacients', controller_pac.buildPacient);

//UPDATE a pacient
router.put('/api/v1/pacients/:id', controller_pac.modifyPacient);

//DELETE one pacient from database
router.delete('/api/v1/pacients/:id', controller_pac.excludePacient);

/**********************************************
Controller: Appointments
***********************************************/

//GET all appointments
router.get('/api/v1/appointments',  controller_app.allAppointments);

//GET just one appointment
router.get('/api/v1/appointments/:id', controller_app.oneAppointment);

// POST a appointment
router.post('/api/v1/appointments', controller_app.buildAppointment);

//UPDATE a appointment
router.put('/api/v1/appointments/:id', controller_app.modifyAppointment);

//DELETE one appointment from database
router.delete('/api/v1/appointments/:id', controller_app.excludeAppointment);

module.exports =  router;
