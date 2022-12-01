import { Entry } from "../types";

type PropsForEntries = {
  entries: Entry[]
};

type SingleEntryProps = {
  entry: Entry
};

const Entries = ({entries}: PropsForEntries) => {
  
  return (
    <div>
      <h3><strong>Entries:</strong></h3>
      <div>
        {entries.map(entry =>
          <SingleEntry key={entry.id} entry={entry}/>)
        }
      </div>  
    </div>

  );
};


const SingleEntry = ({entry}: SingleEntryProps) => {
  return(
    <div>
      <p>{entry.date + ' '} {'  '} <em>{entry.description}</em> </p>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>{code}</li>
        )}
    </ul>
    </div>
  );
};

export default Entries;