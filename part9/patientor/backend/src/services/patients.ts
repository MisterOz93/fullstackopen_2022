import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { toNewPatient, toNewHealthCheckEntry, toNewHospitalEntry, toNewOccupationalHealthcareEntry } from '../utils';

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
  const newPatient = toNewPatient({...patient, entries: []});

  if (patients.find(p => p.ssn === patient.ssn)){
    throw new Error('That patient is already in the database.')
  }

  const id = uuidv4();

  const patientWithId = { ...newPatient, id};

  patients.push(patientWithId);

  return patientWithId;
};

const addEntry = (newEntry: Entry, patient: Patient) => {
  const patientToUpdate = patients.find(p => p.id === patient.id)

  const id = uuidv4();

  const newEntryWithId = {...newEntry, id}

  let newEntryWithType;

  if (newEntryWithId.type === 'Hospital'){
    newEntryWithType = toNewHospitalEntry(newEntryWithId)
  }
  else if (newEntryWithId.type === 'HealthCheck'){
    newEntryWithType = toNewHealthCheckEntry(newEntryWithId)
  }
  else if (newEntryWithId.type === 'OccupationalHealthcare'){
    newEntryWithType = toNewOccupationalHealthcareEntry(newEntryWithId)
  }
  else throw new Error('Unrecognized Entry type on entry:' + newEntryWithId)

  patientToUpdate?.entries.push(newEntryWithType);

  return patientToUpdate?.entries;
}

export default { getPublicPatients, getPatientById, addPatient, addEntry };
