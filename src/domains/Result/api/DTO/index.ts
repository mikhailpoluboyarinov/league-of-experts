import { Result } from "../../index";
import { ResultId } from "../../index";
import { MatchId } from "../../../Match";

export const results: Result[] = [
  {
    id: "result001" as ResultId,
    matchId: "match100" as MatchId,
    type: "group",
    hostScore: 2,
    guestScore: 1,
  },
  {
    id: "result002" as ResultId,
    matchId: "match101" as MatchId,
    type: "group",
    hostScore: 3,
    guestScore: 4,
  },
  {
    id: "result003" as ResultId,
    matchId: "match102" as MatchId,
    type: "group",
    hostScore: 5,
    guestScore: 5,
  },
  {
    id: "result004" as ResultId,
    matchId: "match103" as MatchId,
    type: "play_off",
    hostScore: 1,
    guestScore: 1,
    extra: {
      type: "extra_time",
      hostScoreExtra: 2,
      guestScoreExtra: 1,
    },
  },
];
