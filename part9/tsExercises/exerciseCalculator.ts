interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: Array<number>, target: number): Results => {
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
    ratingDescription = 'More work is needed to reach target goals.';
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
