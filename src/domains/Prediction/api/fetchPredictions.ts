import { Prediction } from "../index";
import { predictions } from "./DTO";

export const fetchPredictions = (): Promise<Prediction[]> => {
  return Promise.resolve(predictions);
};
