import { Gender, NewPatient } from './types';

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
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringField(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringField(ssn),
    gender: parseGender(gender),
    occupation: parseStringField(occupation),
  };
  return newPatient;
};

export default toNewPatient;
