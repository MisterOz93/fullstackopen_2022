import { Gender, NewPatient, Entry,
  HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry, HealthCheckRating, Discharge
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


type NewPatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries
}: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringField(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringField(ssn),
    gender: parseGender(gender),
    occupation: parseStringField(occupation),
    entries: parseEntries(entries)
  };
  return newPatient;
};


//eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries){
    return []
  }
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


const parseType = (type: unknown) => {
    if (type === 'HealthCheck' || type === 'OccupationalHealthcare' || type === 'Hospital'){
      return type
    }
      throw new Error('Entry has invalid type:' + type)
  }


const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  const numberRating = Number(rating)
   return (isNaN(numberRating) || numberRating < 0 || numberRating > 3 ) 
  }

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)){
    throw new Error('Missing or invalid HealthCheckRating:' + rating);
  };
  return rating
}

const isDischarge = (discharge: any): discharge is Discharge => {
  return ('date' in discharge && 'criteria' in discharge && Object.keys(discharge).length === 2)
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)){
    throw new Error('Hospital Entry Discharge information missing or invalid:' + discharge);
  };
  return discharge;
}

interface NewBaseEntryFields {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown
}

interface NewHealthCheckEntryFields extends NewBaseEntryFields {
  type: unknown;
  healthCheckRating: unknown;

}

interface NewOccupationalHealthcareEntryFields extends NewBaseEntryFields {
  type: unknown;
  employerName: unknown;
}

interface NewHospitalEntryFields extends NewBaseEntryFields {
  type: unknown;
  discharge: unknown;
}

export const toNewHealthCheckEntry = (
  { 
    id,
    description,
    date,
    specialist,
    type,
    healthCheckRating
  } : NewHealthCheckEntryFields): HealthCheckEntry => {
    const newHealthCheckEntry: HealthCheckEntry = {
      id: parseStringField(id),
      description: parseStringField(description),
      date: parseDate(date),
      specialist: parseStringField(specialist),
      type: parseType(type) as 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(healthCheckRating)
    }
  return newHealthCheckEntry;
  }

export const toNewOccupationalHealthcareEntry = (
  {
    id,
    description,
    date,
    specialist,
    type,
    employerName
  } : NewOccupationalHealthcareEntryFields): OccupationalHealthCareEntry => {
    const newOccupationalHealthcareEntry: OccupationalHealthCareEntry = {
      id: parseStringField(id),
      description: parseStringField(description),
      date: parseDate(date),
      specialist: parseStringField(specialist),
      type: parseType(type) as 'OccupationalHealthcare',
      employerName: parseStringField(employerName)
    }
  return newOccupationalHealthcareEntry;
}

export const toNewHospitalEntry = (
  {
    id,
    description,
    date,
    specialist,
    type,
    discharge
  } : NewHospitalEntryFields): HospitalEntry => {
    const newHospitalEntry: HospitalEntry = {
      id: parseStringField(id),
      description: parseStringField(description),
      date: parseDate(date),
      specialist: parseStringField(specialist),
      type: parseType(type) as 'Hospital',
      discharge: parseDischarge(discharge)
    }
  return newHospitalEntry
}
