import { Result } from "../../index";
import { ResultId } from "../../index";
import { MatchId } from "../../../Match";

export const results: Result[] = [
  {
    id: 1 as ResultId,
    matchId: 1 as MatchId,
    type: "group",
    hostScore: 2,
    guestScore: 1,
  },
  {
    id: 2 as ResultId,
    matchId: 2 as MatchId,
    type: "group",
    hostScore: 3,
    guestScore: 4,
  },
  {
    id: 3 as ResultId,
    matchId: 3 as MatchId,
    type: "group",
    hostScore: 5,
    guestScore: 5,
  },
  {
    id: 4 as ResultId,
    matchId: 4 as MatchId,
    type: "play_off",
    hostScore: 1,
    guestScore: 1,
    extra: {
      type: "extra_time",
      hostScoreExtra: 2,
      guestScoreExtra: 1,
    },
  },
  {
    id: 5 as ResultId,
    matchId: 5 as MatchId,
    type: "play_off",
    hostScore: 1,
    guestScore: 2,
    extra: {
      type: "no_extra",
    },
  },
];
