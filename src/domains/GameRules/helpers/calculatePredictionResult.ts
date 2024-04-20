import {
  Prediction,
  PredictionExtraPenalty,
  PredictionExtraTime,
  PredictionGroupMatch,
  PredictionPlayOffMatch,
} from "../../Prediction";
import {
  Result,
  ResultExtraPenalty,
  ResultExtraTime,
  ResultGroupMatch,
  ResultPlayOffMatch,
} from "../../Result";
import {
  PredictionResult,
  PredictionResultPlayOffMatch,
  PredictionResultState,
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
): PredictionResultState => {
  const predictionMatchOutcomeVariant = calculateMatchOutcomeVariant(
    predictionExtraTime.hostScoreExtra,
    predictionExtraTime.guestScoreExtra,
  );
  const resultMatchOutcomeVariant = calculateMatchOutcomeVariant(
    resultExtraTime.hostScoreExtra,
    resultExtraTime.guestScoreExtra,
  );

  if (isExtraExactScore(predictionExtraTime, resultExtraTime)) {
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

const calculatePredictionResultPenaltyState = (
  predictionExtraPenalty: PredictionExtraPenalty,
  resultExtraPenalty: ResultExtraPenalty,
): PredictionResultState => {
  const predictionPenaltyOutcomeVariant = calculatePenaltyOutcomeVariant(
    predictionExtraPenalty.hostScorePenalty,
    predictionExtraPenalty.guestScorePenalty,
  );
  const resultPenaltyOutcomeVariant = calculatePenaltyOutcomeVariant(
    resultExtraPenalty.hostScorePenalty,
    resultExtraPenalty.guestScorePenalty,
  );

  if (isPenaltyExactScore(predictionExtraPenalty, resultExtraPenalty)) {
    return { type: "exact_score" };
  }

  switch (resultPenaltyOutcomeVariant.type) {
    case "host_win":
      switch (predictionPenaltyOutcomeVariant.type) {
        case "guest_win":
          return { type: "fail" };
        case "host_win":
          return predictionPenaltyOutcomeVariant.gap ===
            resultPenaltyOutcomeVariant.gap
            ? { type: "exact_difference" }
            : { type: "match_outcome" };
        default:
          return notReachable(predictionPenaltyOutcomeVariant);
      }
    case "guest_win":
      switch (predictionPenaltyOutcomeVariant.type) {
        case "host_win":
          return { type: "fail" };
        case "guest_win":
          return predictionPenaltyOutcomeVariant.gap ===
            resultPenaltyOutcomeVariant.gap
            ? { type: "exact_difference" }
            : { type: "match_outcome" };
        default:
          return notReachable(predictionPenaltyOutcomeVariant);
      }
    default:
      return notReachable(resultPenaltyOutcomeVariant);
  }
};

const calculatePredictionResultPlayOffMatch = (
  prediction: PredictionPlayOffMatch,
  result: ResultPlayOffMatch,
): PredictionResultPlayOffMatch => {
  switch (result.extra.type) {
    case "no_extra":
      return {
        type: "play_off",
        matchState: calculatePredictionResultMatchState(prediction, result),
        extraState: null,
        penaltyState: null,
      };
    case "extra_time":
      switch (prediction.extra.type) {
        case "no_extra":
        case "extra_penalty":
          throw new Error("Impossible state");
        case "extra_time":
          return {
            type: "play_off",
            matchState: calculatePredictionResultMatchState(prediction, result),
            extraState: calculatePredictionResultExtraState(
              prediction.extra,
              result.extra,
            ),
            penaltyState: null,
          };
        default:
          return notReachable(prediction.extra);
      }

    case "extra_penalty":
      switch (prediction.extra.type) {
        case "no_extra":
        case "extra_time":
          throw new Error("Impossible state");
        case "extra_penalty":
          return {
            type: "play_off",
            matchState: calculatePredictionResultMatchState(prediction, result),
            extraState: calculatePredictionResultExtraState(
              {
                type: "extra_time",
                guestScoreExtra: prediction.extra.guestScoreExtra,
                hostScoreExtra: prediction.extra.hostScoreExtra,
              },
              {
                type: "extra_time",
                guestScoreExtra: result.extra.guestScoreExtra,
                hostScoreExtra: result.extra.hostScoreExtra,
              },
            ),
            penaltyState: calculatePredictionResultPenaltyState(
              prediction.extra,
              result.extra,
            ),
          };
        default:
          return notReachable(prediction.extra);
      }

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

type PenaltyOutcomeVariant =
  | {
      type: "host_win";
      gap: number;
    }
  | { type: "guest_win"; gap: number };

const calculatePenaltyOutcomeVariant = (
  hostScore: number,
  guestScore: number,
): PenaltyOutcomeVariant => {
  const gap = hostScore - guestScore;

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

const isExtraExactScore = (
  prediction: PredictionExtraTime,
  result: ResultExtraTime,
): boolean => {
  return (
    prediction.hostScoreExtra === result.hostScoreExtra &&
    prediction.guestScoreExtra === result.guestScoreExtra
  );
};

const isPenaltyExactScore = (
  prediction: PredictionExtraPenalty,
  result: ResultExtraPenalty,
): boolean => {
  return (
    prediction.hostScorePenalty === result.hostScorePenalty &&
    prediction.guestScorePenalty === result.guestScorePenalty
  );
};
