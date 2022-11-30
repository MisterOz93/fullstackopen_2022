import { Gender, NewPatient, Entry } from './types';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  return (
    entry.type === 'HealthCheck' ||
    entry.type === 'Hospital' ||
    entry.type === 'OccupationalHealthcare'
  );
};

const parseEntries = (entries: unknown): Entry[] => {
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
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringField(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringField(ssn),
    gender: parseGender(gender),
    occupation: parseStringField(occupation),
    entries: parseEntries(entries),
  };
  return newPatient;
};

export default toNewPatient;
