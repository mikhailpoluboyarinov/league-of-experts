import { Brand } from "ts-brand";
import { UserId } from "../User";
import { MatchId } from "../Match";

export type PredictionId = Brand<number, "prediction Id">;

export type Prediction = PredictionGroupMatch | PredictionPlayOffMatch;

export type PredictionNoExtra = { type: "no_extra" };

export type PredictionExtraTime = {
  type: "extra_time";
  hostScoreExtra: number;
  guestScoreExtra: number;
};

export type PredictionExtraPenalty = {
  type: "extra_penalty";
  hostScoreExtra: number;
  guestScoreExtra: number;
  hostScorePenalty: number;
  guestScorePenalty: number;
};

export type PredictionGroupMatch = {
  type: "group";
  id: PredictionId;
  userId: UserId;
  matchId: MatchId;
  hostScore: number;
  guestScore: number;
};

export type PredictionPlayOffMatch = {
  type: "play_off";
  id: PredictionId;
  userId: UserId;
  matchId: MatchId;
  hostScore: number;
  guestScore: number;
  extra: PredictionNoExtra | PredictionExtraTime | PredictionExtraPenalty;
};
