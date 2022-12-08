import { Gender, NewPatient, //Entry, 
  //HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry 
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error(` Missing or malformatted data field:` + value);
  }
  return value;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !Date.parse(date)) {
    throw new Error('Missing or malformatted date:' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (input: any): input is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(input);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(
      'Missing or invalid Gender information, please enter male, female, or other'
    );
  }
  return gender;
};

/* work in progress entry validation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  if (
    !entry.type || !entry.id || !entry.description || !entry.date || !entry.specialist
  ) { 
    return false;
  };

  switch(entry.type){
    case "HealthCheck":
      return isHealthCheckEntry(entry);
    case "Hospital":
      return isHospitalEntry(entry);
    case "OccupationalHealthcare":
      return isOccupationalHealthcare(entry);
    default:
      console.log('unhandled entry type:', entry.type)
      return false;
  }

};

//helper functions for isEntry

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  return (entry.healthCheckRating || entry.healthCheckRating === 0 ? true : false)
};
const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  return (entry.discharge ? true : false)
};

const isOccupationalHealthcare = (entry: any): entry is OccupationalHealthCareEntry => {
  return (entry.employerName ? true : false)
};
//

/*const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Missing or invalid Entry data.');
  }
  for (let i = 0; i < entries.length; i++) {
    if (!isEntry(entries[i])) {
      throw new Error(`Invalid entry at position: ${i}`);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}; */

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringField(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringField(ssn),
    gender: parseGender(gender),
    occupation: parseStringField(occupation),
    entries: []
  };
  return newPatient;
};

export default toNewPatient;
