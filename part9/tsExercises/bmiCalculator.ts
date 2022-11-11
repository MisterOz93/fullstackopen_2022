interface Measurements {
  height: number;
  weight: number;
}

const validateArgs = (args: Array<string>): Measurements => {
  if (process.argv.length != 4) {
    throw new Error(
      'Invalid input length - please input the npm script followed by two numbers'
    );
  }

  if (isNaN(+process.argv[2]) || isNaN(+process.argv[3])) {
    throw new Error(
      'Invalid input types - please input two numbers afer the npm run script'
    );
  }

  return {
    height: +args[2],
    weight: +args[3],
  };
};

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

try {
  const { height, weight } = validateArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else console.log(error);
}

export default calculateBmi;
