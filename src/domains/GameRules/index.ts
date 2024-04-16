export type PredictionResultState =
  | PredictionResultFail
  | PredictionResultSuccessScore
  | PredictionResultSuccessDifference
  | PredictionResultSuccessOutcome;

export type PredictionResultFail = { type: "fail" };
export type PredictionResultSuccessScore = { type: "exact_score" };
export type PredictionResultSuccessDifference = { type: "exact_difference" };
export type PredictionResultSuccessOutcome = { type: "match_outcome" };

export type PredictionResult =
  | {
      type: "group";
      state: PredictionResultState;
    }
  | {
      type: "play_off";
      model:
        | { type: "no_extra"; state: PredictionResultState }
        | {
            type: "extra_time";
            state:
              | PredictionResultFail
              | { type: "exact_score"; extra: PredictionResultState }
              | { type: "exact_difference"; extra: PredictionResultState }
              | { type: "match_outcome"; extra: PredictionResultState };
          }
        | {
            type: "extra_penalty";
            state:
              | PredictionResultFail
              | {
                  type: "exact_score";
                  extra:
                    | PredictionResultFail
                    | { type: "exact_score"; penalty: PredictionResultState }
                    | {
                        type: "exact_difference";
                        penalty: PredictionResultState;
                      }
                    | { type: "match_outcome"; penalty: PredictionResultState };
                }
              | {
                  type: "exact_difference";
                  extra:
                    | PredictionResultFail
                    | { type: "exact_score"; penalty: PredictionResultState }
                    | {
                        type: "exact_difference";
                        penalty: PredictionResultState;
                      }
                    | { type: "match_outcome"; penalty: PredictionResultState };
                }
              | {
                  type: "match_outcome";
                  extra:
                    | PredictionResultFail
                    | { type: "exact_score"; penalty: PredictionResultState }
                    | {
                        type: "exact_difference";
                        penalty: PredictionResultState;
                      }
                    | { type: "match_outcome"; penalty: PredictionResultState };
                };
          };
    };
