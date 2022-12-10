import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Input from '@material-ui/core/Input';

import { Diagnosis, EntryType } from "../types";

export interface EntryFormValues {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][];
    type: string;
    dischargeDate: string;
    dischargeCriteria: string;
    employerName: string;
    

};

export type EntryTypeOption = {
    value: EntryType;
    label: string;
}

type EntrySelectFieldProps = {
    name: string;
    label: string;
    options: EntryTypeOption[]
} 

const FormikSelect = ({field, ...props}: FieldProps) => <Select {...field} {...props} />;

export const EntryFormSelect = ({name, label, options}: EntrySelectFieldProps) => (
    <>
        <InputLabel>{label}</InputLabel>
        <Field 
          fullWidth
          style={{ marginBottom: "0.5em" }}
          label={label}
          component={FormikSelect}
          name={name}
       	 >
         {options.map((option) => (
           <MenuItem key={option.value} value={option.value}>
             {option.label || option.value}
           </MenuItem>
            ))}
        </Field>
    </>
)



