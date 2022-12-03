export const assertNever = (value: never): never => {
  throw new Error(`Unhandled option of union type: ${JSON.stringify(value)}`);
};
