export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum EntryType {
  Hospital = 'hospital',
  OccupationalHealthcare = 'occupationalHealthcare',
  HealthCheck = 'healthCheck',
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
}

type Discharge = {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthCareEntry
  | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
