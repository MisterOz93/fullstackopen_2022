import { Entry, Diagnosis } from '../types';

type entryProps = {
entry: Entry;
diagnoses: Diagnosis[]
};

const HospitalEntry = ({entry, diagnoses}: entryProps) => {

  const codeIndex = (code:string): number => {
    return diagnoses.map(d => d.code).indexOf(code);
  };

  return(
    <div>
      <p>{entry.date + ' '} {'  '} <em>{entry.description}</em> </p>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>{code} {diagnoses[codeIndex(code)].name}</li>
        )}
    </ul>
    </div>
  );
};

export default HospitalEntry;