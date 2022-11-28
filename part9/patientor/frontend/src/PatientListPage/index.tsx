import React, {useEffect} from "react";
import axios from "axios";
import { Box, Table, Button, TableHead, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, addPatient, setCurrentPatient } from "../state";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";

const PatientListPage = () => {
  const [{ patients, currentPatient }, dispatch] = useStateValue();

  /*if true, display single patient page. false on render so
   clicking Home button displays home page unless name is clicked*/
  const [displaySingle, setDisplaySingle] = React.useState<boolean>(false);
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const navigate = useNavigate();
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch(addPatient(newPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const displayPatient = (id: string) => {
    const getPatient = async () => {
      const { data: selectedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(setCurrentPatient(selectedPatient));
    };
    
    if (!currentPatient || currentPatient.id !== id){
      void getPatient();
    }
    setDisplaySingle(true);
  };


  useEffect(() => {
    if (currentPatient && displaySingle){
      navigate(`patients/${currentPatient.id}`);
    }
  }, [currentPatient, displaySingle]);

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Button onClick={() => displayPatient(patient.id)}
                variant="contained" color="primary"> 
                  {patient.name}
                </Button>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
