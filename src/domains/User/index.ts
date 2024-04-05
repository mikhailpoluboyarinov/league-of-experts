import { Brand } from "ts-brand";

export type UserId = Brand<string, "user Id">;

export type User = {
  id: UserId;
  name: string;
  photoUrl: string;
  lastWinner: boolean;
};
