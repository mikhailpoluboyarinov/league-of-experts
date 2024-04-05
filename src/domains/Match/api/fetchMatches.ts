import { Match } from "../index";
import { matches } from "./DTO";

export const fetchMatches = (): Promise<Match[]> => {
  return Promise.resolve(matches);
};
