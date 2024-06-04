import { GameDay } from "../../../Match";
import { Misc, MiscId } from "../../index";
import { CountryId } from "../../../Country";

export const miscs: Misc[] = [
  {
    id: 1 as MiscId,
    currentGameDay: 3 as GameDay,
    isRegistrationOpen: false,
    winnerCountry: 4 as CountryId,
  },
];
