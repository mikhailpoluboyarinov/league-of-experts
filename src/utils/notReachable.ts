export const notReachable = (value: never): never => {
  throw new Error(`Should never be reached ${value}`);
};
