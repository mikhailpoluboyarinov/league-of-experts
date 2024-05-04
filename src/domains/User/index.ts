import { Brand } from "ts-brand";
import { CountryCode } from "../Country";

export type UserId = Brand<string, "user Id">;

export type User = {
  id: UserId;
  name: string;
  photoUrl: string;
  lastWinner: boolean;
  winnerPrediction: CountryCode;
};
