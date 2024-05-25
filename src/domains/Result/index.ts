import { Brand } from "ts-brand";
import { MatchId } from "../Match";

export type ResultId = Brand<number, "result Id">;

export type Result = ResultGroupMatch | ResultPlayOffMatch;

export type ResultNoExtra = { type: "no_extra" };

export type ResultExtraTime = {
  type: "extra_time";
  hostScoreExtra: number;
  guestScoreExtra: number;
};

export type ResultExtraPenalty = {
  type: "extra_penalty";
  hostScoreExtra: number;
  guestScoreExtra: number;
  hostScorePenalty: number;
  guestScorePenalty: number;
};

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
  extra: ResultNoExtra | ResultExtraTime | ResultExtraPenalty;
};
