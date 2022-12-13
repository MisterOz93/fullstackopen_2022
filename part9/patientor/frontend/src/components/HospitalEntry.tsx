import { HospitalEntry, Diagnosis } from '../types';
import type * as CSS from 'csstype';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const entriesStyle: CSS.Properties = {
  borderStyle: 'solid',
  borderWidth: 'thin'
};

const innerMargin: CSS.Properties = {
  marginLeft: '2%'
};

type entryProps = {
entry: HospitalEntry;
diagnoses: Diagnosis[]
};

const HospitalEntryDetails = ({entry, diagnoses}: entryProps) => {
  console.log('hospital entry in HospitalEntry component:', entry)

  const codeIndex = (code:string): number => {
    return diagnoses.map(d => d.code).indexOf(code);
  };

  return(
    <div style={entriesStyle}>
      <div style={innerMargin}>
        <p>{entry.date + ' '} <LocalHospitalIcon /></p> 
        <p>{'  '} <em>{entry.description}</em> </p>
        <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>{code} {diagnoses[codeIndex(code)].name}</li>
          )}
        </ul>
        <p>Diagnosed by {entry.specialist}</p>
        <p>Patient discharged {entry.discharge.date}: <em>{entry.discharge.criteria}</em></p>
      </div>
    </div>
  );
};

export default HospitalEntryDetails;