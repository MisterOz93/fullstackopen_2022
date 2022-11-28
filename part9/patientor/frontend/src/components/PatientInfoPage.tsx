import { useParams } from "react-router";
import { useStateValue } from "../state";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


const PatientInfoPage = () => {
  const [{ currentPatient }] = useStateValue();
  const patient = currentPatient;
  const id: string | undefined = useParams().id;
  if (!id) {
    return (<h2>Error: Could not find a patient with that information.</h2>);
  }

  if (!patient) {
    return <h3>Error, please return to Home Page.</h3>;
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