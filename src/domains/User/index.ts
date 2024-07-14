import { Brand } from "ts-brand";
import { CountryId } from "../Country";

export type UserId = Brand<number, "user Id">;
export type UserWinnerCount = Brand<number, "winner count">;
export type UserHotBallPoints = Brand<number, "hot ball points">;
export type WinnerPoints = Brand<number, "winner points">;

export type User = {
  id: UserId;
  chatId: string;
  name: string;
  lastName: string;
  photoUrl: string;
  winnerCount: UserWinnerCount;
  lastWinner: boolean;
  winnerPrediction: CountryId;
  hotBallPoints: UserHotBallPoints;
  winnerPoints: WinnerPoints;
  isAI: boolean;
};
