import { Entry, Diagnosis } from '../types';
import type * as CSS from 'csstype';

const entriesStyle: CSS.Properties = {
  borderStyle: 'solid',
  borderWidth: 'thin'
};

const innerMargin: CSS.Properties = {
  marginLeft: '2%'
};

type entryProps = {
entry: Entry;
diagnoses: Diagnosis[]
};

const HospitalEntry = ({entry, diagnoses}: entryProps) => {

  const codeIndex = (code:string): number => {
    return diagnoses.map(d => d.code).indexOf(code);
  };

  return(
    <div style={entriesStyle}>
      <h3 style={innerMargin}>this is type: {entry.type} </h3>
      <p style={innerMargin}>{entry.date + ' '} {'  '} <em>{entry.description}</em> </p>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>{code} {diagnoses[codeIndex(code)].name}</li>
        )}
    </ul>
    </div>
  );
};

export default HospitalEntry;