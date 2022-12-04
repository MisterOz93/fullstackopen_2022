import { Diagnosis, HealthCheckEntry } from '../types';
import * as CSS from 'csstype';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';

type entryProps = {
entry: HealthCheckEntry;
diagnoses: Diagnosis[]
};

const entriesStyle: CSS.Properties = {
  borderStyle: 'solid',
  borderWidth: 'thin'
};

const innerMargin: CSS.Properties = {
  marginLeft: '2%'
};


const HealthCheckEntryDetails = ({entry, diagnoses}: entryProps) => {
  const codeIndex = (code:string): number => {
    return diagnoses.map(d => d.code).indexOf(code);
  };
  console.log(entry.healthCheckRating);

  return(
    <div id='container' style={entriesStyle}>
      <div style={innerMargin}>
        <p>{entry.date + ' '} {'  '}<CalendarMonthIcon/></p>
        <p><em>{entry.description}</em> </p>
        <FavoriteIcon style={{fill: "green"}}/>
        <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>{code} {diagnoses[codeIndex(code)].name}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HealthCheckEntryDetails;