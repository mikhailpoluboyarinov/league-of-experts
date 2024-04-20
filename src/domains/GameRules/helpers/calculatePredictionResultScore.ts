import {
  PredictionResult,
  PredictionResultGroupMatch,
  PredictionResultPlayOffMatch,
  PredictionResultState,
} from "../index";
import { notReachable } from "../../../utils/notReachable";

type Params = {
  predictionResult: PredictionResult;
};
export const calculatePredictionResultScore = ({
  predictionResult,
}: Params): number => {
  switch (predictionResult.type) {
    case "group":
      return calculatePredictionResultGroupMatchScore(predictionResult);

    case "play_off":
      return calculatePredictionResultPlayOffMatchTotalScore(predictionResult);
    default:
      return notReachable(predictionResult);
  }
};

const calculatePredictionResultGroupMatchScore = (
  predictionResult: PredictionResultGroupMatch,
): number => {
  switch (predictionResult.matchState.type) {
    case "fail":
      return 0;
    case "exact_score":
      return 5;
    case "exact_difference":
      return 3;
    case "match_outcome":
      return 2;
    default:
      return notReachable(predictionResult.matchState);
  }
};

const calculatePredictionResultPlayOffMatchTotalScore = (
  predictionResult: PredictionResultPlayOffMatch,
): number => {
  const matchScore = calculatePredictionResultPlayOffMatchScore(
    predictionResult.matchState,
  );
  const extraScore = calculatePredictionResultPlayOffMatchExtraScore(
    predictionResult.extraState,
  );
  const penaltyScore = calculatePredictionResultPlayOffMatchPenaltyScore(
    predictionResult.penaltyState,
  );
  return matchScore + extraScore + penaltyScore;
};

const calculatePredictionResultPlayOffMatchScore = (
  state: PredictionResultState,
): number => {
  switch (state.type) {
    case "fail":
      return 0;
    case "exact_score":
      return 10;
    case "exact_difference":
      return 6;
    case "match_outcome":
      return 4;
    default:
      return notReachable(state);
  }
};

const calculatePredictionResultPlayOffMatchExtraScore = (
  state: PredictionResultState | null,
): number => {
  if (state === null) {
    return 0;
  }

  switch (state.type) {
    case "fail":
      return 0;
    case "exact_score":
      return 5;
    case "exact_difference":
      return 3;
    case "match_outcome":
      return 2;
    default:
      return notReachable(state);
  }
};

const calculatePredictionResultPlayOffMatchPenaltyScore = (
  state: PredictionResultState | null,
): number => {
  if (state === null) {
    return 0;
  }

  switch (state.type) {
    case "fail":
      return 0;
    case "exact_score":
      return 5;
    case "exact_difference":
      return 3;
    case "match_outcome":
      return 2;
    default:
      return notReachable(state);
  }
};
