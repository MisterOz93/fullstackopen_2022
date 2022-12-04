import { Entry, Diagnosis } from "../types";
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';
import HealthCheckEntryDetails from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import { assertNever } from '../utils';

type PropsForEntries = {
  entries: Entry[];
  diagnoses: Diagnosis[];
};

type SingleEntryProps = {
  entry: Entry;
  diagnoses: Diagnosis[];
};

const Entries = ({entries, diagnoses}: PropsForEntries) => {

  return (
    <div>
      <h3><strong>Entries:</strong></h3>
      <div>
        {entries.map(entry =>
          <SingleEntry key={entry.id} entry={entry} diagnoses={diagnoses} />)
        }
      </div>  
    </div>

  );
};


const SingleEntry = ({entry, diagnoses }: SingleEntryProps) => {
//console.log(entry.type);
  switch(entry.type){
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntry entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default Entries;