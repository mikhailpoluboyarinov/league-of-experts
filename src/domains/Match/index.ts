import { Brand } from "ts-brand";
import { CountryId } from "../Country";
import { TimeStamp } from "../Date";

export type MatchId = Brand<number, "match Id">;
export type GameDay = Brand<number, "game day">;

export type Match = MatchGroup | MatchPlayOff;

export type MatchGroup = {
  type: "group";
  id: MatchId;
  hostId: CountryId;
  guestId: CountryId;
  startTime: TimeStamp;
  gameDay: GameDay;
  isCloseForPrediction: boolean;
  description: string;
};

export type MatchPlayOff = {
  type: "play_off";
  id: MatchId;
  hostId: CountryId;
  guestId: CountryId;
  startTime: TimeStamp;
  gameDay: GameDay;
  isCloseForPrediction: boolean;
  description: string;
};
