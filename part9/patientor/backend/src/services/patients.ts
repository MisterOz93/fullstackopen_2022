import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import toNewPatient from '../utils';

import { Patient, PublicPatient, NewPatient, Entry } from '../types';

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatientById = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = toNewPatient(patient);

  const id = uuidv4();

  const patientWithId = { ...newPatient, id, entries: [] };

  patients.push(patientWithId);

  return patientWithId;
};

const addEntry = (newEntry: Entry, patient: Patient) => {
  const patientToUpdate = patients.find(p => p.id === patient.id)

  patientToUpdate?.entries.push(newEntry);

  return patientToUpdate;
}

export default { getPublicPatients, getPatientById, addPatient, addEntry };
