import { Match, MatchId, GameDay } from "../../index";
import { CountryId } from "../../../Country";
import { TimeStamp } from "../../../Date";

export const matches: Match[] = [
  {
    id: 1 as MatchId,
    type: "group",
    hostId: 1 as CountryId,
    guestId: 2 as CountryId,
    startTime: 1673616000000 as TimeStamp,
    gameDay: 3 as GameDay,
    isCloseForPrediction: true,
    description: "",
  },
  {
    id: 2 as MatchId,
    type: "group",
    hostId: 4 as CountryId,
    guestId: 5 as CountryId,
    startTime: 1673702400000 as TimeStamp,
    gameDay: 1 as GameDay,
    isCloseForPrediction: true,
    description: "",
  },
  {
    id: 3 as MatchId,
    type: "group",
    hostId: 6 as CountryId,
    guestId: 7 as CountryId,
    startTime: 1673788800000 as TimeStamp,
    gameDay: 1 as GameDay,
    isCloseForPrediction: true,
    description: "",
  },
  {
    id: 4 as MatchId,
    type: "play_off",
    hostId: 6 as CountryId,
    guestId: 7 as CountryId,
    startTime: 1673788800000 as TimeStamp,
    gameDay: 15 as GameDay,
    isCloseForPrediction: true,
    description: "",
  },
  {
    id: 5 as MatchId,
    type: "play_off",
    hostId: 6 as CountryId,
    guestId: 7 as CountryId,
    startTime: 1673788800000 as TimeStamp,
    gameDay: 16 as GameDay,
    isCloseForPrediction: true,
    description: "",
  },
];
