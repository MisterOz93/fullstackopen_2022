import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { useStateValue } from "../state";
import { Diagnosis, EntryType } from '../types';
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField } from "../AddPatientModal/FormField";

/* user clicks 'Add Entry' in PatientInfoPage -> user gets a prompt (form? radiobutton?) asking to select type of entry -> user selection is passed 
  to AddEntryForn as entryType, entryType value determines additional field renders
  
  Note: Initial prompt could be unneeded? Test out how form's values.foo works, if it updates dynamically, maybe can just set inital type as Hospital or w/e.
 */
export interface EntryFormValues {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][];
    type: string; //Make a small form component on 1st button click in patientinfopage where user has to choose type first, then pass choice to form values
};

interface EntryFormProps {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    entryType: string;
  }

const AddEntryForm = ({ onSubmit, onCancel, entryType }: EntryFormProps) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: entryType //pass via user input in PatientInfPage first button click
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values  }) => {
        console.log('form values:', values)
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Entry Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date Of Entry"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Name of Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {
                values.type === 'Hospital' &&

                <>
                    <Field  
                      label="Discharge Date"
                      placeholder="YYYY-MM-DD"
                      name="dischargeDate"
                      component={TextField} 
                    />
                    <Field
                      label="Criteria for Discharge"
                      placeholder="Criteria"
                      name="dischargeCriteria"
                      component={TextField}
                    />
                </>
            }
            {
                values.type === 'HealthCheck' &&
                <h3>check instructions for help on healthcheckrating</h3>
            }
            { 
                values.type === 'OccupationalHealthcare' &&
                <Field 
                    label="Employer Name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={TextField}
                />    
            }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    )
}

export default AddEntryForm;