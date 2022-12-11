import { EntryFormValues } from "./AddEntryModal/EntryFormHelper";

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled option of union type: ${JSON.stringify(value)}`);
};

export const formatEntryValues = (entryValues: EntryFormValues) => {
  //start by filtering out empty values
  let dateFormatted: string[]; 
  dateFormatted = entryValues.date.split('')
  dateFormatted.splice(4, 0, '-')
  dateFormatted.splice(7, 0, '-')
  const formattedDate = dateFormatted.join('')
  console.log('formattedDate', formattedDate)

  //need to also format dispatch fields and possibly others. also remove empty fields
}