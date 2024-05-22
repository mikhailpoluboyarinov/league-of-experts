import { Misc } from "../index";
import { miscs } from "./DTO";

export const fetchPredictions = (): Promise<Misc[]> => {
  return Promise.resolve(miscs);
};
