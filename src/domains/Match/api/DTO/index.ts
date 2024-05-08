import { Match, MatchId, GameDay } from "../../index";
import { CountryId } from "../../../Country";
import { TimeStamp } from "../../../Date";

export const matches: Match[] = [
  {
    id: "match100" as MatchId,
    type: "group",
    hostId: "US" as CountryId,
    guestId: "GB" as CountryId,
    startTime: 1673616000000 as TimeStamp,
    gameDay: 3 as GameDay,
  },
  {
    id: "match101" as MatchId,
    type: "group",
    hostId: "DE" as CountryId,
    guestId: "FR" as CountryId,
    startTime: 1673702400000 as TimeStamp,
    gameDay: 1 as GameDay,
  },
  {
    id: "match102" as MatchId,
    type: "group",
    hostId: "AU" as CountryId,
    guestId: "JP" as CountryId,
    startTime: 1673788800000 as TimeStamp,
    gameDay: 1 as GameDay,
  },
  {
    id: "match103" as MatchId,
    type: "play_off",
    hostId: "AU" as CountryId,
    guestId: "JP" as CountryId,
    startTime: 1673788800000 as TimeStamp,
    gameDay: 15 as GameDay,
  },
  {
    id: "match104" as MatchId,
    type: "play_off",
    hostId: "AU" as CountryId,
    guestId: "JP" as CountryId,
    startTime: 1673788800000 as TimeStamp,
    gameDay: 16 as GameDay,
  },
];
