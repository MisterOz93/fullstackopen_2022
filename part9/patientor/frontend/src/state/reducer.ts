import { State } from './state';
import { Patient } from '../types';

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
      type: 'EDIT_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_CURRENT_PATIENT';
      payload: string | undefined;
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
    case 'EDIT_PATIENT':
      return {
        ...state,
        patients: { ...state.patients, [action.payload.id]: action.payload },
      }; //^Need to confirm this works

    case 'SET_CURRENT_PATIENT':
      if (typeof action.payload === 'string') {
        return {
          ...state,
          currentPatient: state.patients[action.payload],
        };
      }
      return {
        ...state,
        currentPatient: undefined,
      };
    default:
      return state;
  }
};
