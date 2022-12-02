import { Entry, Diagnosis } from "../types";
import axios from 'axios';
import { useEffect } from "react";
import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnosesList } from "../state";

type PropsForEntries = {
  entries: Entry[]
};

type SingleEntryProps = {
  entry: Entry;
  diagnoses: Diagnosis[];
};

const Entries = ({entries}: PropsForEntries) => {

  const [{ diagnoses }, dispatch] = useStateValue();
  
  useEffect(() => {
    const getDiagnosesFromApi = async () => {
      try {
        const {data: diagnosesData} = await axios.get<Diagnosis[]>(apiBaseUrl + '/diagnoses');  
        dispatch(setDiagnosesList(diagnosesData));
      } catch (e) {
        console.error(e);
      }
    };
    void getDiagnosesFromApi();
  }, []);
  console.log('diagnoses data in state is:', diagnoses[0]);
  
  return (
    <div>
      <h3><strong>Entries:</strong></h3>
      <div>
        {entries.map(entry =>
          <SingleEntry key={entry.id} entry={entry} diagnoses={diagnoses}/>)
        }
      </div>  
    </div>

  );
};


const SingleEntry = ({entry, diagnoses}: SingleEntryProps) => {
  return(
    <div>
      <p>{entry.date + ' '} {'  '} <em>{entry.description}</em> </p>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
        )}
    </ul>
    </div>
  );
};

export default Entries;