import { OccupationalHealthCareEntry, Diagnosis } from '../types';
import * as CSS from 'csstype';
import WorkIcon from '@mui/icons-material/Work';

type entryProps = {
entry: OccupationalHealthCareEntry;
diagnoses: Diagnosis[]
};

const entriesStyle: CSS.Properties = {
  borderStyle: 'solid',
  borderWidth: 'thin'
};

const innerMargin: CSS.Properties = {
  marginLeft: '2%'
};


const OccupationalHealthCareEntryDetails = ({entry, diagnoses}: entryProps) => {

  const codeIndex = (code:string): number => {
    return diagnoses.map(d => d.code).indexOf(code);
  };

  return(
    <div id='container' style={entriesStyle}>
    <div style={innerMargin}>
      <p>{entry.date + ' '} {'  '} <WorkIcon/> {' '} {entry.employerName}</p>
      <p><em>{entry.description}</em> </p>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>{code} {diagnoses[codeIndex(code)].name}</li>
        )}
      </ul>
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  </div>
  );
};

export default OccupationalHealthCareEntryDetails;