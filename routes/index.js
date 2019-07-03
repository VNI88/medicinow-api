import express from 'express';
import db from '../db/queries';
import { getAllMedicalAgreements } from '../controllers/medical_agreements';

const router = express.Router();

//GET all medical agreements
router.get('/api/v1/medical_agreements', db.getAllMedicalAgreements);

//GET just one medical agreement
router.get('/api/v1/medical_agreements/:id', db.getMedicalAgreement);

// POST a medical agreement
router.post('/api/v1/medical_agreements', db.createMedicalAgreement);

//UPDATE a medical agreement
router.put('/api/v1/medical_agreements/:id', db.updateMedicalAgreement);

 //DELETE one appointment from database
 router.delete('/api/v1/medical_agreements/:id', db.deleteMedicalAgreement);

export default router;
