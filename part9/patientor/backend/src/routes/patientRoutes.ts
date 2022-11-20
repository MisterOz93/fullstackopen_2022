import express from 'express';
import patientService from '../services/patients';
import { NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPerson: NewPatient = req.body;

  if (!newPerson) {
    throw new Error('missing data');
  }
  res.send(patientService.addPatient(newPerson));
});
export default router;
