export type PredictionResultState =
  | Fail
  | SuccessScore
  | SuccessDifference
  | SuccessOutcome;

export type Fail = { type: "fail" };
export type SuccessScore = { type: "exact_score" };
export type SuccessDifference = { type: "exact_difference" };
export type SuccessOutcome = { type: "match_outcome" };
export type SuccessExtra = { type: "success_extra" };

export type PredictionResult =
  | PredictionResultGroupMatch
  | PredictionResultPlayOffMatch;

export type PredictionResultGroupMatch = {
  type: "group";
  matchState: PredictionResultState;
};

export type PredictionResultPlayOffMatch = {
  type: "play_off";
  matchState: PredictionResultState;
  extraState: Fail | SuccessExtra | null;
};
