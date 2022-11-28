import express from 'express';

const router = express.Router();

import patientService from '../services/patients';
import { NewPatient } from '../types';

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    res.status(400).send('Error: Could not find requested patient.');
  } else {
    //console.log('patient in getByID route is', patient);
    res.json(patient);
  }
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPerson: NewPatient = req.body;
  if (!newPerson) {
    throw new Error('missing data');
  }
  try {
    const addedPatient = patientService.addPatient(newPerson);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send('There was an error with the request');
    }
  }
});
export default router;
