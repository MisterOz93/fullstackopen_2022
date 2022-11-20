import { Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseStringField = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error(` Missing or malformatted data field:` + value);
  }
  return value;
};

export const parseDate = (date: unknown): string => {
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

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(
      'Missing or invalid Gender information, please enter male, female, or other'
    );
  }
  return gender;
};
