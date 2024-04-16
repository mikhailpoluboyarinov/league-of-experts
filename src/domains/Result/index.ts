import { Brand } from "ts-brand";
import { MatchId } from "../Match";

export type ResultId = Brand<string, "result Id">;

export type Result =
  | {
      type: "group";
      id: ResultId;
      matchId: MatchId;
      hostScore: number;
      guestScore: number;
    }
  | {
      type: "play_off";
      id: ResultId;
      matchId: MatchId;
      hostScore: number;
      guestScore: number;
      extra:
        | {
            type: "no_extra";
          }
        | {
            type: "extra_time";
            hostScoreExtra: number;
            guestScoreExtra: number;
          }
        | {
            type: "extra_penalty";
            hostScoreExtra: number;
            guestScoreExtra: number;
            hostScorePenalty: number;
            guestScorePenalty: number;
          };
    };
