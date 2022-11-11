/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import bmiCalculator from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get(`/bmi`, (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight || isNaN(+height) || isNaN(+weight)) {
    res.send({
      error: 'malformatted parameters',
    });
  } else {
    res.send({
      weight,
      height,
      bmi: bmiCalculator(+height, +weight),
    });
  }
});

app.post('/exercises', (req, res) => {
  const data = req.body;
  if (!data.daily_exercises || !data.target) {
    return res.status(400).json({
      error: 'Parameters missing',
    });
  }

  if (!Array.isArray(data.daily_exercises) || isNaN(+data.target)) {
    return res.status(400).json({
      error: 'Malformatted Parameters',
    });
  }

  const dailyExercises: Array<string> = data.daily_exercises;

  if (
    dailyExercises.map((d: string) => +d).length !==
    dailyExercises.filter((d: string) => !isNaN(+d)).length
  ) {
    return res.status(400).json({
      error: 'Malformatted Parameters',
    });
  }
  const targetToNum: number = +data.target;
  const exercisesToNum: Array<number> = dailyExercises.map((d: string) => +d);
  exercisesToNum.unshift(targetToNum);

  const results = calculateExercises(exercisesToNum);

  return res.json(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
