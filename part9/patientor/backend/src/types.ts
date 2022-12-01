export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
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

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
}

type Discharge = {
  date: string;
  criteria: string;
};

interface HospitalEntry extends BaseEntry {
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
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn'>;
