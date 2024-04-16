import { Brand } from "ts-brand";
import { CountryId } from "../Country";
import { TimeStamp } from "../Date";

export type MatchId = Brand<string, "match Id">;
export type GameDay = Brand<number, "game day">;

export type Match = {
  id: MatchId;
  isPlayoffMatch: boolean;
  hostId: CountryId;
  guestId: CountryId;
  startTime: TimeStamp;
  gameDay: GameDay;
};
