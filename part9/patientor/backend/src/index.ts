import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRoutes';
import patientsRouter from './routes/patientRoutes';

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong!');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log('Server is up on PORT', PORT);
});
