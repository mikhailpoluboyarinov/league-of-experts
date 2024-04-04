import { Result } from "../index";
import { results } from "./DTO";

export const fetchResults = (): Promise<Result[]> => {
  return Promise.resolve(results);
};
