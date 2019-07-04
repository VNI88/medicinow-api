const express = require('express');
import db from '../db/queries';
const controller = require('../controllers/medical_agreements.js')


let router = express.Router();

//GET all medical agreements
router.get('/api/v1/medical_agreements',  controller.allMedicalAgreement);

//GET just one medical agreement
router.get('/api/v1/medical_agreements/:id', controller.oneMedicalAgreement);

// POST a medical agreement
router.post('/api/v1/medical_agreements', controller.buildMedicalAgreement);

//UPDATE a medical agreement
router.put('/api/v1/medical_agreements/:id', controller.modifyMedicalAgreement);

 //DELETE one appointment from database
 router.delete('/api/v1/medical_agreements/:id', controller.excludeMedicalAgreement);

module.exports =  router;
