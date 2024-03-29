import { useParams } from "react-router";
import axios from "axios";
import { useStateValue, setCurrentPatient, setDiagnosesList, editPatientEntries } from "../state";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import Entries from "./Entries";
import { useEffect, useState } from "react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/EntryFormHelper";
import {formatEntryValues} from '../utils'

const PatientInfoPage = () => {
  const [{diagnoses, currentPatient}, dispatch] = useStateValue();
  //console.log('current patient in PatientInfo page is', currentPatient);
  //console.log('diagnoses data in Info page:', diagnoses);
  const id: string | undefined = useParams().id;
  if (!id) {
    return (<h2>Error: Could not find a patient with that information.</h2>);
  }

  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>();

  const openForm = ():void => setFormOpen(true);

  const closeForm = ():void => setFormOpen(false);


  const submitNewEntry = async (values: EntryFormValues) => {
    
    const formattedValues = formatEntryValues(values);
    //console.log('formatted values being sent to backend are:', formattedValues)
    try {    
      const {data: newEntry } = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, formattedValues);
      dispatch(editPatientEntries(newEntry));
     //console.log('newEntry data returned from back end is ', newEntry)
      closeForm();
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.'
      if(axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        errorMessage = error.response.data;
      }
      setError(errorMessage);
    }
  };

  useEffect(() => {
    const getDiagnosesFromApi = async () => {
      const {data: diagnosesList } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      dispatch(setDiagnosesList(diagnosesList));
    };
    void getDiagnosesFromApi();

    const setPatient = async () => {
      const {data: singlePatientData} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(setCurrentPatient(singlePatientData));
    };
    void setPatient();

  },[dispatch]); 

  if (!currentPatient){
    //void refetchPatient();
    if (!currentPatient){
      return(
        <div> 
          <h3>Loading...</h3>
          <p>If this takes more than a few seconds please return to the Home Page.</p>
        </div>
      
      );
    }
  }

  if (!diagnoses[0].name) {
      return (
        <div>
          <h3>Loading...</h3>
          <p>If this takes more than a few seconds, please return to the Home page.</p>
        </div>
      );
  }
  
  return(
    <div>
      <h2>{currentPatient.name} {currentPatient.gender === 'male' && <MaleIcon/>} {currentPatient.gender === 'female' && <FemaleIcon/>}</h2>
      {currentPatient.ssn &&
      <p>ssn: {currentPatient.ssn}</p>
      } 
      <p>occupation: {currentPatient.occupation}</p>
      <h3><strong>Entries:</strong></h3>
      <p><button onClick={openForm}>Add Entry</button></p>
      <AddEntryModal modalOpen={formOpen} onClose={closeForm} onSubmit={submitNewEntry} error={error}/>
      <Entries entries={currentPatient.entries} diagnoses={diagnoses} />
   </div>
  );
};

export default PatientInfoPage;