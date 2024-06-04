import { Brand } from "ts-brand";
import { GameDay } from "../Match";
import { CountryId } from "../Country";

export type MiscId = Brand<number, "misc Id">;

export type Misc = {
  id: MiscId;
  currentGameDay: GameDay;
  isRegistrationOpen: boolean;
  winnerCountry: CountryId;
};
