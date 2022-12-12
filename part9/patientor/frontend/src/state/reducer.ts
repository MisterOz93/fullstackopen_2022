import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'EDIT_PATIENT_ENTRIES';
      payload: Entry;
    }
  | {
      type: 'SET_CURRENT_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnosis[];
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const editPatientEntries = (entry: Entry): Action => {
  return {
    type: 'EDIT_PATIENT_ENTRIES',
    payload: entry,
  };
};

export const setCurrentPatient = (patient: Patient): Action => {
  return {
    type: 'SET_CURRENT_PATIENT',
    payload: patient,
  };
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnoses,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'EDIT_PATIENT_ENTRIES':
      if (!state.currentPatient) {
        return state;
      }
      const entries = state.currentPatient.entries;
      if (!entries){
        return state;
      };
      const updatedEntries = entries.concat(action.payload);
      
      return {
        ...state,
        currentPatient: { ...state.currentPatient, entries: updatedEntries},
      }; 

    case 'SET_CURRENT_PATIENT':
      return {
        ...state,
        currentPatient: action.payload,
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};
