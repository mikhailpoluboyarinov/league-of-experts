import { Brand } from "ts-brand";
import { UserId } from "../User";
import { MatchId } from "../Match";

export type PredictionId = Brand<number, "prediction Id">;

export type Prediction = PredictionGroupMatch | PredictionPlayOffMatch;

export type PredictionExtraTime =
  | PredictionNoExtra
  | PredictionExtraHostTeamExtraTime
  | PredictionExtraGuestTeamExtraTime
  | PredictionExtraHostTeamExtraPenalty
  | PredictionExtraGuestTeamExtraPenalty;

export type PredictionNoExtra = "no_extra";

export type PredictionExtraHostTeamExtraTime = "host_extra";

export type PredictionExtraGuestTeamExtraTime = "guest_extra";

export type PredictionExtraHostTeamExtraPenalty = "host_penalty";

export type PredictionExtraGuestTeamExtraPenalty = "guest_penalty";

export type PredictionGroupMatch = {
  type: "group";
  id: PredictionId;
  userId: UserId;
  matchId: MatchId;
  hostScore: number;
  guestScore: number;
  isPari: boolean;
  isAIPrediction: boolean;
};

export type PredictionPlayOffMatch = {
  type: "play_off";
  id: PredictionId;
  userId: UserId;
  matchId: MatchId;
  hostScore: number;
  guestScore: number;
  isPari: boolean;
  isAIPrediction: boolean;
  extra: PredictionExtraTime;
};
