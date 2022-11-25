import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import toNewPatient from '../utils';

import { Patient, PatientWithoutSSN, NewPatient } from '../types';

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = toNewPatient(patient);

  const id = uuidv4();

  const patientWithId = { ...newPatient, id };

  patients.push(patientWithId);

  return patientWithId;
};

export default { getPatientsWithoutSSN, addPatient };
