interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const checkArgs = (args: Array<string>): Array<number> => {
  const input = args.slice(2);
  if (input.length < 2) {
    throw new Error('Not enough arguments provided.');
  }
  const inputToNum = input.map((arg) => +arg);

  console.log(inputToNum.length);
  if (inputToNum.length !== input.filter((a) => !isNaN(+a)).length) {
    throw new Error(
      'Invalid arguments, only numbers can be passed after npm script'
    );
  }
  return inputToNum;
};

const calculateExercises = (args: Array<number>): Results => {
  const target = args[0];
  const days = args.slice(1);

  const hoursTrained = days.reduce((sum: number, num: number): number => {
    return (sum += num);
  });

  const average = hoursTrained / days.length;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Target training hours achieved!';
  } else if (average >= target - 1) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'Bad. More work is needed to reach target goals.';
  }

  return {
    periodLength: days.length,
    trainingDays: days.filter((d) => d !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const validateArgs = checkArgs(process.argv);
  console.log(calculateExercises(validateArgs));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(error);
  }
}

export default calculateExercises;
