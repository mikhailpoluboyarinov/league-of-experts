import { Prediction } from "../../Prediction";
import { Result } from "../../Result";
import { PredictionResult } from "../index";

type Params = {
  prediction: Prediction;
  result: Result;
};
export const calculatePredictionResult = ({
  prediction,
  result,
}: Params): PredictionResult => {
  throw new Error("not implemented");
};
