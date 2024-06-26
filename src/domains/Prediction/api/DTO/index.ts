import { Prediction, PredictionNoExtra } from "../../index";
import { PredictionId } from "../../index";
import { UserId } from "../../../User";
import { MatchId } from "../../../Match";

export const predictions: Prediction[] = [
  {
    id: 1 as PredictionId,
    userId: 1 as UserId,
    matchId: 1 as MatchId,
    type: "group",
    hostScore: 2,
    guestScore: 1,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 2 as PredictionId,
    userId: 2 as UserId,
    matchId: 1 as MatchId,
    type: "group",
    hostScore: 3,
    guestScore: 1,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 3 as PredictionId,
    userId: 3 as UserId,
    matchId: 1 as MatchId,
    type: "group",
    hostScore: 2,
    guestScore: 4,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 4 as PredictionId,
    userId: 1 as UserId,
    matchId: 2 as MatchId,
    type: "group",
    hostScore: 2,
    guestScore: 3,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 5 as PredictionId,
    userId: 2 as UserId,
    matchId: 2 as MatchId,
    type: "group",
    hostScore: 1,
    guestScore: 3,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 6 as PredictionId,
    userId: 3 as UserId,
    matchId: 2 as MatchId,
    type: "group",
    hostScore: 2,
    guestScore: 4,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 7 as PredictionId,
    userId: 1 as UserId,
    matchId: 3 as MatchId,
    type: "group",
    hostScore: 1,
    guestScore: 5,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 8 as PredictionId,
    userId: 2 as UserId,
    matchId: 3 as MatchId,
    type: "group",
    hostScore: 6,
    guestScore: 6,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 9 as PredictionId,
    userId: 3 as UserId,
    matchId: 3 as MatchId,
    type: "group",
    hostScore: 1,
    guestScore: 4,
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 10 as PredictionId,
    userId: 1 as UserId,
    matchId: 4 as MatchId,
    type: "play_off",
    hostScore: 1,
    guestScore: 1,
    extra: "host_extra",
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 11 as PredictionId,
    userId: 2 as UserId,
    matchId: 4 as MatchId,
    type: "play_off",
    hostScore: 6,
    guestScore: 6,
    extra: "host_extra",
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 12 as PredictionId,
    userId: 3 as UserId,
    matchId: 4 as MatchId,
    type: "play_off",
    hostScore: 1,
    guestScore: 4,
    extra: "host_extra",
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 13 as PredictionId,
    userId: 1 as UserId,
    matchId: 5 as MatchId,
    type: "play_off",
    hostScore: 5,
    guestScore: 5,
    extra: "host_extra",
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 14 as PredictionId,
    userId: 2 as UserId,
    matchId: 5 as MatchId,
    type: "play_off",
    hostScore: 1,
    guestScore: 6,
    extra: "host_extra",
    isPari: false,
    isAIPrediction: false,
  },
  {
    id: 15 as PredictionId,
    userId: 3 as UserId,
    matchId: 5 as MatchId,
    type: "play_off",
    hostScore: 1,
    guestScore: 4,
    extra: "host_extra",
    isPari: false,
    isAIPrediction: false,
  },
];
