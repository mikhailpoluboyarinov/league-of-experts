import { Brand } from "ts-brand";
import { MatchId } from "../Match";

export type ResultId = Brand<number, "result Id">;

export type Result = ResultGroupMatch | ResultPlayOffMatch;

export type ResultExtraTime =
  | ResultNoExtra
  | ResultExtraHostTeamExtraTime
  | ResultExtraGuestTeamExtraTime
  | ResultExtraHostTeamExtraPenalty
  | ResultExtraGuestTeamExtraPenalty;

export type ResultNoExtra = "no_extra";

export type ResultExtraHostTeamExtraTime = "host_extra";

export type ResultExtraGuestTeamExtraTime = "guest_extra";

export type ResultExtraHostTeamExtraPenalty = "host_penalty";

export type ResultExtraGuestTeamExtraPenalty = "guest_penalty";

export type ResultGroupMatch = {
  type: "group";
  id: ResultId;
  matchId: MatchId;
  hostScore: number;
  guestScore: number;
};

export type ResultPlayOffMatch = {
  type: "play_off";
  id: ResultId;
  matchId: MatchId;
  hostScore: number;
  guestScore: number;
  extra: ResultExtraTime;
};
