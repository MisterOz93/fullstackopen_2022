import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

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
  const id = uuidv4();

  const newPatient: Patient = { id, ...patient };

  patients.push(newPatient);

  return newPatient;
};

export default { getPatientsWithoutSSN, addPatient };
