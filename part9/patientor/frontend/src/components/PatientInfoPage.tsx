import { useParams } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useStateValue } from "../state";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientInfoPage = () => {
  const [{currentPatient }] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>(currentPatient);
 
  const id: string | undefined = useParams().id;
  if (!id) {
    return (<h2>Error: Could not find a patient with that information.</h2>);
  }

  const refetchPatient = async () => {
    const {data: apiPatient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    setPatient(apiPatient);
  };

  if (!patient) {
    void refetchPatient();
    if (!patient){
      return <h2>Loading patient data, please wait or return to the Home Page.</h2>;
    }
  } 

  return (
    <div>
      <h2>{patient.name} {patient.gender === 'male' && <MaleIcon/>} {patient.gender === 'female' && <FemaleIcon/>}</h2>
      {patient.ssn &&
      <p>ssn: {patient.ssn}</p>
      } 
      <p>occupation: {patient.occupation}</p>
   </div>
  );
};

export default PatientInfoPage;