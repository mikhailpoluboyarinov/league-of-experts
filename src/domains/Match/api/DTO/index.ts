import { Match, MatchId, GameDay } from "../../index";
import { CountryId } from "../../../Country";
import { TimeStamp } from "../../../Date";

export const matches: Match[] = [
  {
    id: "match100" as MatchId,
    hostId: "US" as CountryId,
    guestId: "GB" as CountryId,
    startTime: 1673616000000 as TimeStamp,
    gameDay: 1 as GameDay,
  },
  {
    id: "match101" as MatchId,
    hostId: "DE" as CountryId,
    guestId: "FR" as CountryId,
    startTime: 1673702400000 as TimeStamp,
    gameDay: 1 as GameDay,
  },
  {
    id: "match102" as MatchId,
    hostId: "AU" as CountryId,
    guestId: "JP" as CountryId,
    startTime: 1673788800000 as TimeStamp,
    gameDay: 1 as GameDay,
  },
  {
    id: "match103" as MatchId,
    hostId: "CN" as CountryId,
    guestId: "BR" as CountryId,
    startTime: 1673875200000 as TimeStamp,
    gameDay: 2 as GameDay,
  },
  {
    id: "match104" as MatchId,
    hostId: "IN" as CountryId,
    guestId: "RU" as CountryId,
    startTime: 1673961600000 as TimeStamp,
    gameDay: 2 as GameDay,
  },
  {
    id: "match105" as MatchId,
    hostId: "ZA" as CountryId,
    guestId: "MX" as CountryId,
    startTime: 1674048000000 as TimeStamp,
    gameDay: 2 as GameDay,
  },
  {
    id: "match106" as MatchId,
    hostId: "IT" as CountryId,
    guestId: "ES" as CountryId,
    startTime: 1674134400000 as TimeStamp,
    gameDay: 3 as GameDay,
  },
  {
    id: "match107" as MatchId,
    hostId: "AR" as CountryId,
    guestId: "KR" as CountryId,
    startTime: 1674220800000 as TimeStamp,
    gameDay: 3 as GameDay,
  },
  {
    id: "match108" as MatchId,
    hostId: "SA" as CountryId,
    guestId: "NG" as CountryId,
    startTime: 1674307200000 as TimeStamp,
    gameDay: 3 as GameDay,
  },
  {
    id: "match109" as MatchId,
    hostId: "EG" as CountryId,
    guestId: "EG" as CountryId,
    startTime: 1674393600000 as TimeStamp,
    gameDay: 4 as GameDay,
  },
];
