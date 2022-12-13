import { EntryFormValues } from "./AddEntryModal/EntryFormHelper";

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled option of union type: ${JSON.stringify(value)}`);
};

const formatDate = (dateArg:string): string => {

  if (dateArg.includes('-')) {
    return dateArg;
  }

  let dateFormatted: string[]; 
    dateFormatted = dateArg.split('');
    dateFormatted.splice(4, 0, '-');
    dateFormatted.splice(7, 0, '-');
    return dateFormatted.join('');
}

export const formatEntryValues = (entryValues: EntryFormValues) => {
  //start by filtering out empty values
  let relevantValues = Object.fromEntries(Object.entries(entryValues).filter(([k,v]) => v !== ""));

  relevantValues = {...relevantValues, date: formatDate(entryValues.date) }

  if (entryValues.type === 'Hospital'){
    const discharge = {date: formatDate(entryValues.dischargeDate), criteria: entryValues.dischargeCriteria}
    relevantValues = {...relevantValues, discharge }
  }
 
  return {...relevantValues}


};