const calculateBmi = (h: number, w: number): string => {
  const meters = h / 100;
  const bmi = w / (meters * meters);
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi < 25) {
    return 'Normal Weight';
  }
  if (bmi < 30) {
    return 'Overweight';
  }
  return 'Obese';
};

console.log(calculateBmi(180, 74));
