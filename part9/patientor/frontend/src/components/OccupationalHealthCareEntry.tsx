import { Entry, Diagnosis } from '../types';
import * as CSS from 'csstype';

type entryProps = {
entry: Entry;
diagnoses: Diagnosis[]
};

const entriesStyle: CSS.Properties = {
  borderStyle: 'solid',
  borderWidth: 'thin'
};

const innerMargin: CSS.Properties = {
  marginLeft: '2%'
};


const OccupationalHealthCareEntry = ({entry, diagnoses}: entryProps) => {

  const codeIndex = (code:string): number => {
    return diagnoses.map(d => d.code).indexOf(code);
  };

  return(
    <div id='container' style={entriesStyle}>
    <div style={innerMargin}>
      <p>{entry.date + ' '} {'  '}insert icon here</p>
      <p><em>{entry.description}</em> </p>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>{code} {diagnoses[codeIndex(code)].name}</li>
        )}
      </ul>
    </div>
  </div>
  );
};

export default OccupationalHealthCareEntry;