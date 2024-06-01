import {
  Prediction,
  PredictionExtraTime,
  PredictionPlayOffMatch,
} from "../../Prediction";
import { Result, ResultExtraTime, ResultPlayOffMatch } from "../../Result";
import {
  Fail,
  PredictionResult,
  PredictionResultPlayOffMatch,
  PredictionResultState,
  SuccessExtra,
} from "../index";
import { notReachable } from "../../../utils/notReachable";

type Params = {
  prediction: Prediction;
  result: Result;
};
export const calculatePredictionResult = ({
  prediction,
  result,
}: Params): PredictionResult => {
  switch (prediction.type) {
    case "group":
      switch (result.type) {
        case "group":
          return {
            type: "group",
            matchState: calculatePredictionResultMatchState(prediction, result),
          };
        case "play_off":
          throw new Error("Impossible state");
        default:
          return notReachable(result);
      }

    case "play_off":
      switch (result.type) {
        case "group":
          throw new Error("Impossible state");
        case "play_off":
          return calculatePredictionResultPlayOffMatch(prediction, result);
        default:
          return notReachable(result);
      }
    default:
      return notReachable(prediction);
  }
};

const calculatePredictionResultMatchState = (
  prediction: Prediction,
  result: Result,
): PredictionResultState => {
  const predictionMatchOutcomeVariant = calculateMatchOutcomeVariant(
    prediction.hostScore,
    prediction.guestScore,
  );
  const resultMatchOutcomeVariant = calculateMatchOutcomeVariant(
    result.hostScore,
    result.guestScore,
  );

  if (isMatchExactScore(prediction, result)) {
    return { type: "exact_score" };
  }

  switch (resultMatchOutcomeVariant.type) {
    case "draw":
      switch (predictionMatchOutcomeVariant.type) {
        case "draw":
          return { type: "exact_difference" };
        case "host_win":
        case "guest_win":
          return { type: "fail" };
        default:
          return notReachable(predictionMatchOutcomeVariant);
      }
    case "host_win":
      switch (predictionMatchOutcomeVariant.type) {
        case "draw":
        case "guest_win":
          return { type: "fail" };
        case "host_win":
          return predictionMatchOutcomeVariant.gap ===
            resultMatchOutcomeVariant.gap
            ? { type: "exact_difference" }
            : { type: "match_outcome" };
        default:
          return notReachable(predictionMatchOutcomeVariant);
      }
    case "guest_win":
      switch (predictionMatchOutcomeVariant.type) {
        case "draw":
        case "host_win":
          return { type: "fail" };
        case "guest_win":
          return predictionMatchOutcomeVariant.gap ===
            resultMatchOutcomeVariant.gap
            ? { type: "exact_difference" }
            : { type: "match_outcome" };
        default:
          return notReachable(predictionMatchOutcomeVariant);
      }
    default:
      return notReachable(resultMatchOutcomeVariant);
  }
};

const calculatePredictionResultExtraState = (
  predictionExtraTime: PredictionExtraTime,
  resultExtraTime: ResultExtraTime,
): Fail | SuccessExtra => {
  if (predictionExtraTime === resultExtraTime) {
    return { type: "success_extra" };
  }

  return { type: "fail" };
};
const calculatePredictionResultPlayOffMatch = (
  prediction: PredictionPlayOffMatch,
  result: ResultPlayOffMatch,
): PredictionResultPlayOffMatch => {
  switch (result.extra) {
    case "no_extra":
      return {
        type: "play_off",
        matchState: calculatePredictionResultMatchState(prediction, result),
        extraState: null,
      };

    case "host_extra":
    case "guest_extra":
    case "host_penalty":
    case "guest_penalty":
      return {
        type: "play_off",
        matchState: calculatePredictionResultMatchState(prediction, result),
        extraState: calculatePredictionResultExtraState(
          prediction.extra,
          result.extra,
        ),
      };

    default:
      return notReachable(result.extra);
  }
};

type MatchOutcomeVariant =
  | {
      type: "host_win";
      gap: number;
    }
  | { type: "draw" }
  | { type: "guest_win"; gap: number };

const calculateMatchOutcomeVariant = (
  hostScore: number,
  guestScore: number,
): MatchOutcomeVariant => {
  const gap = hostScore - guestScore;

  if (gap === 0) {
    return { type: "draw" };
  }

  if (gap > 0) {
    return { type: "host_win", gap };
  }

  return { type: "guest_win", gap };
};

const isMatchExactScore = (prediction: Prediction, result: Result): boolean => {
  return (
    prediction.hostScore === result.hostScore &&
    prediction.guestScore === result.guestScore
  );
};
