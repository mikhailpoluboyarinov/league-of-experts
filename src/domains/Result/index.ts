import { Brand } from "ts-brand";
import { MatchId } from "../Match";

export type ResultId = Brand<string, "result Id">;

export type Result = {
  id: ResultId;
  matchId: MatchId;
  hostScore: number;
  guestScore: number;
  hostScoreExtra: number | null;
  guestScoreExtra: number | null;
  hostScorePenalty: number | null;
  guestScorePenalty: number | null;
};
