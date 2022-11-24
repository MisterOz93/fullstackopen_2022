export const assertNever = (value: never): never => {
  throw new Error(`Unhandled member of union type: ${JSON.stringify(value)}`)
}
