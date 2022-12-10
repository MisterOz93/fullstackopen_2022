import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { useStateValue } from "../state";
import { Diagnosis, EntryType, HealthCheckRating } from '../types';
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField } from "../AddPatientModal/FormField";
import { EntryFormValues, EntryTypeOption, HealthRatingOption, EntryFormSelect } from "./EntryFormHelper";

interface EntryFormProps {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }

const EntryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'Health Check'},
  { value: EntryType.Hospital, label: 'Hospital'},
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare'}
]

const HealthRatingOptions: HealthRatingOption[] = [
  {value: HealthCheckRating.Healthy, label: 'Healthy'},
  {value: HealthCheckRating.LowRisk, label: 'Low Risk'},
  {value: HealthCheckRating.HighRisk, label: 'High Risk'},
  {value: HealthCheckRating.CriticalRisk, label: 'Critical Risk'},

]

const AddEntryForm = ({ onSubmit, onCancel }: EntryFormProps) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "", //user selects, then additional Field's are rendered.
        dischargeCriteria: "",
        dischargeDate: "",
        employerName: ""
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
      enableReinitialize={true}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values  }) => {
        //console.log('form values.type:', values.type)
        return (
          <Form className="form ui">
            <EntryFormSelect
              label="Entry Type"
              name="type"
              options={EntryTypeOptions}
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
                values.type === 'hospital' &&
                <Field  
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField} 
                />
            }
             {
                values.type === 'hospital' &&
                <Field
                  label="Criteria for Discharge"
                  placeholder="Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
            }
            {
                values.type === 'healthCheck' &&
                <EntryFormSelect
                  label='Health Check Rating'
                  name='rating'
                  options={HealthRatingOptions} />
            }
            { 
                values.type === 'occupationalHealthcare' &&
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