import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { parseStringField, parseDate, parseGender } from '../utils';

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

  const newPatient: Patient = {
    id,
    name: parseStringField(patient.name),
    dateOfBirth: parseDate(patient.dateOfBirth),
    ssn: parseStringField(patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseStringField(patient.occupation),
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getPatientsWithoutSSN, addPatient };
