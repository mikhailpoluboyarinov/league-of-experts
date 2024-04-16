import { Brand } from "ts-brand";
import { UserId } from "../User";
import { MatchId } from "../Match";

export type PredictionId = Brand<string, "prediction Id">;

export type Prediction =
  | {
      type: "group";
      id: PredictionId;
      userId: UserId;
      matchId: MatchId;
      hostScore: number;
      guestScore: number;
    }
  | {
      type: "play_off";
      id: PredictionId;
      userId: UserId;
      matchId: MatchId;
      hostScore: number;
      guestScore: number;
      hostScoreExtra: number | null;
      guestScoreExtra: number | null;
      hostScorePenalty: number | null;
      guestScorePenalty: number | null;
    };
