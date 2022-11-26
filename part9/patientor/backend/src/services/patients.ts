import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import toNewPatient from '../utils';

import { Patient, PublicPatient, NewPatient } from '../types';

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = toNewPatient(patient);

  const id = uuidv4();

  const patientWithId = { ...newPatient, id };

  patients.push(patientWithId);

  return patientWithId;
};

export default { getPublicPatients, getPatientById, addPatient };
