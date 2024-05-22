import { Brand } from "ts-brand";
import { CountryCode } from "../Country";

export type UserId = Brand<number, "user Id">;
export type UserWinnerCount = Brand<number, "winner count">;

export type User = {
  id: UserId;
  chatId: string;
  name: string;
  lastName: string;
  photoUrl: string;
  winnerCount: UserWinnerCount;
  lastWinner: boolean;
  winnerPrediction: CountryCode;
};
