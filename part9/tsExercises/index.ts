import express from 'express';
import bmiCalculator from './bmiCalculator';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
