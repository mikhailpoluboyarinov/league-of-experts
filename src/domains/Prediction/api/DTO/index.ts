import { Prediction } from "../../index";
import { PredictionId } from "../../index";
import { UserId } from "../../../User";
import { MatchId } from "../../../Match";

export const predictions: Prediction[] = [
  {
    id: "predictionId1" as PredictionId,
    userId: "user001" as UserId,
    matchId: "match100" as MatchId,
    type: "group",
    hostScore: 2,
    guestScore: 1,
  },
  {
    id: "predictionId1" as PredictionId,
    userId: "user002" as UserId,
    matchId: "match100" as MatchId,
    type: "group",
    hostScore: 3,
    guestScore: 1,
  },
  {
    id: "predictionId1" as PredictionId,
    userId: "user003" as UserId,
    matchId: "match100" as MatchId,
    type: "group",
    hostScore: 2,
    guestScore: 4,
  },
  {
    id: "predictionId1" as PredictionId,
    userId: "user001" as UserId,
    matchId: "match101" as MatchId,
    type: "group",
    hostScore: 3,
    guestScore: 2,
  },
  {
    id: "predictionId1" as PredictionId,
    userId: "user002" as UserId,
    matchId: "match101" as MatchId,
    type: "group",
    hostScore: 1,
    guestScore: 2,
  },
  {
    id: "predictionId1" as PredictionId,
    userId: "user003" as UserId,
    matchId: "match101" as MatchId,
    type: "group",
    hostScore: 4,
    guestScore: 4,
  },
  {
    id: "predictionId1" as PredictionId,
    userId: "user001" as UserId,
    matchId: "match102" as MatchId,
    type: "group",
    hostScore: 1,
    guestScore: 5,
  },
  {
    id: "predictionId1" as PredictionId,
    userId: "user002" as UserId,
    matchId: "match102" as MatchId,
    type: "group",
    hostScore: 6,
    guestScore: 6,
  },
  {
    id: "predictionId1" as PredictionId,
    userId: "user003" as UserId,
    matchId: "match102" as MatchId,
    type: "group",
    hostScore: 1,
    guestScore: 4,
  },
];