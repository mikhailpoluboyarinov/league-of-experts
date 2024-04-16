import { PredictionResult } from "../index";
import { notReachable } from "../../../utils/notReachable";

type Params = {
  predictionResult: PredictionResult;
};
export const calculatePredictionResultScore = ({
  predictionResult,
}: Params): number => {
  switch (predictionResult.type) {
    case "group":
      const groupState = predictionResult.state;
      switch (groupState.type) {
        case "fail":
          return 0;
        case "exact_score":
          return 5;
        case "exact_difference":
          return 3;
        case "match_outcome":
          return 2;
        default:
          return notReachable(groupState);
      }

    case "play_off":
      const playOffState = predictionResult.model;
      switch (playOffState.type) {
        case "no_extra": {
          const playOffNoExtraState = playOffState.state;
          switch (playOffNoExtraState) {
          }
        }
        case "extra_time":
          break;
        case "extra_penalty":
          break;
      }
    default:
      return notReachable(predictionResult);
  }
};
