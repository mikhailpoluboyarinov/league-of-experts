import { Match } from "../domains/Match";
import { Prediction } from "../domains/Prediction";
import { Result } from "../domains/Result";
import { User, UserId } from "../domains/User";
import {
  GAME_DAYS_GROUP,
  GAME_DAYS_PLAYOFF,
} from "../domains/GameRules/constants/constants";
import { calculatePredictionResult } from "../domains/GameRules/helpers/calculatePredictionResult";
import { calculatePredictionResultScore } from "../domains/GameRules/helpers/calculatePredictionResultScore";
import { CountryId } from "../domains/Country";
import { calculatePariScore } from "../domains/GameRules/helpers/calculatePariScore";
import {useAiScores} from "./useAiScores";
import {notReachable} from "../utils/notReachable";

type Params = {
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
};

export type UserWithScoresTotal = {
  id: UserId;
  name: string;
  avatar: string;
  totalScore: number;
  isWinner: boolean;
  winnerCount: number;
  winnerPrediction: CountryId;
  doublePointsScore: number;
  pariPointsScoreGroup: number;
  pariPointsScorePlayoff: number;
  pariPointsScore: number;
  exactScoresNumber: number;
  exactScoresNumberGroupStage: number;
  exactScoresNumberPlayoffStage: number;
  scoresByGroupGameDays: number[];
  pariScoresByGroupGameDays: number[];
  doublePointsScoreByGroupGameDays: number[];
  scoresByPlayOffGameDays: number[];
  pariScoresByPlayOffGameDays: number[];
  userGroupScore: number;
  userPlayoffScore: number;
};

export const useUsersWithScoresTotal = ({
  matches,
  results,
  users,
  predictions,
}: Params): UserWithScoresTotal[] => {
  const aiScores = useAiScores({ predictions, results })
  const filteredUsers = users.filter((user) => !user.isAI);

  // Пробегаем по всем юзерам и возвращаем модель с посчитанными очками
  const usersWithScores = filteredUsers.map((user) => {
    // Итоговое кол-во очков за турнир
    let userTotalScore: number = 0;
    // Кол-во очков полученных за матчи с двойными очками (групповой этап)
    let doublePointsScore: number = 0;
    // Кол-во очков полученных за pari
    let pariPointsScoreGroup: number = 0;
    let pariPointsScorePlayoff: number = 0;
    // Кол-во точно угаданных результатов
    let exactScoresNumber: number = 0;
    // Кол-во точно угаданных групповых результатов
    let exactScoresNumberGroupStage: number = 0;
    // Кол-во точно угаданных плейофф результатов
    let exactScoresNumberPlayoffStage: number = 0;
    // Итоговое кол-во очков за групповой этап
    let userGroupScore: number = 0;
    // Итоговое кол-во очков за плейофф этап
    let userPlayoffScore: number = 0;
    // Массив со значениями очков за игровые дни плейоффа, index - игровой день, значение - кол-во очков за игровой день
    const scoresByPlayOffGameDays = Array(GAME_DAYS_PLAYOFF).fill(0);
    // Массив со значениями очков за игровые дни группового этапа, index - игровой день, значение - кол-во очков за игровой день
    const scoresByGroupGameDays = Array(GAME_DAYS_GROUP).fill(0);
    // Массив со значениями очков за пари за игровые дни группового этапа
    const pariScoresByGroupGameDays = Array(GAME_DAYS_GROUP).fill(0);
    // Массив со значениями очков за пари за игровые дни плей-офф
    const pariScoresByPlayOffGameDays = Array(GAME_DAYS_PLAYOFF).fill(0);
    // Массив со значениями очков за выставочные матчи за игровые дни группового этапа
    const doublePointsScoreByGroupGameDays = Array(GAME_DAYS_GROUP).fill(0);

    // Получаем все прогнозы конкретного пользователя по его id ( мы внутри map!!!!!)
    const userPredictions = predictions.filter((prediction) => {
      return prediction.userId === user.id;
    });

    // Перебираем в цикле полученные шагом ранее прогнозы конкретного пользователя
    userPredictions.forEach((userPrediction) => {
      // Получаем результат матча, чтобы сопоставить его с прогнозом пользователя
      const resultMatch = results.find((result) => {
        return result.matchId === userPrediction.matchId;
      });

      if (!resultMatch) {
        return;
      }

      // Получаем данные матча,чтобы понять к какому игровому дню он относится
      const match = matches.find((match) => {
        return resultMatch.matchId === match.id;
      });

      if (!match) {
        return;
      }

      // Считаем исход прогноза пользователя по конкретному матчу
      const userPredictionResult = calculatePredictionResult({
        prediction: userPrediction,
        result: resultMatch,
      });

      // Считаем кол-во очков полученных за прогноз на конкретный матч
      const score = calculatePredictionResultScore({
        predictionResult: userPredictionResult,
      });

      if (match.isDoublePoints) {
        doublePointsScore += score;
        doublePointsScoreByGroupGameDays[match.gameDay - 1] += score;
      }

      if (userPrediction.isPari) {
        const pariScore = calculatePariScore({
          userScore: score,
          aiScore: aiScores[match.id],
        });

        switch (match.type) {
          case "group":
            pariPointsScoreGroup += pariScore;
            pariScoresByGroupGameDays[match.gameDay - 1] += pariScore;
            break
          case "play_off":
            pariPointsScorePlayoff += pariScore;
            pariScoresByPlayOffGameDays[match.gameDay - 1 - GAME_DAYS_GROUP] += pariScore;
            break
          default:
            notReachable(match)
        }
      }

      // Если пользователь угадал точный счет, обновляем кол-во точно угаданных результатов
      if (userPredictionResult.matchState.type === "exact_score") {
        exactScoresNumber += 1;
      }

      // Если пользователь угадал точный счет в грпповом этапе, обновляем кол-во точно угаданных групповых результатов
      if (
        userPredictionResult.type === "group" &&
        userPredictionResult.matchState.type === "exact_score"
      ) {
        exactScoresNumberGroupStage += 1;
      }

      // Если пользователь угадал точный счет в плейофф этапе, обновляем кол-во точно угаданных плейофф результатов
      if (
        userPredictionResult.type === "play_off" &&
        userPredictionResult.matchState.type === "exact_score"
      ) {
        exactScoresNumberPlayoffStage += 1;
      }

      // записываем кол-во очков за этот день (либо в плейофф, либо в групповом этапе)
      if (match.gameDay > GAME_DAYS_GROUP) {
        scoresByPlayOffGameDays[match.gameDay - 1 - GAME_DAYS_GROUP] += score;
      } else {
        scoresByGroupGameDays[match.gameDay - 1] += score;
      }

      // Если матч групповой, то записываем результат в переменную с итоговым кол-вом очков за групповой этап
      if (match.type === "group") {
        userGroupScore += score;
      }

      // Если матч плейофф, то записываем результат в переменную с итоговым кол-вом очков за плейофф этап
      if (match.type === "play_off") {
        userPlayoffScore += score;
      }

      // Обновляем итоговое кол-во очков за турнир
      userTotalScore += score;
    });

    return {
      id: user.id,
      name: `${user.name} ${user.lastName}`,
      avatar: user.photoUrl,
      isWinner: user.lastWinner,
      winnerCount: user.winnerCount,
      winnerPrediction: user.winnerPrediction,
      doublePointsScore,
      pariPointsScoreGroup,
      pariPointsScorePlayoff,
      pariPointsScore: pariPointsScoreGroup + pariPointsScorePlayoff,
      exactScoresNumber,
      exactScoresNumberGroupStage,
      exactScoresNumberPlayoffStage,
      userGroupScore: userGroupScore + doublePointsScore + pariPointsScoreGroup,
      userPlayoffScore: userPlayoffScore + pariPointsScorePlayoff,
      totalScore: userTotalScore + doublePointsScore + pariPointsScoreGroup + pariPointsScorePlayoff,
      scoresByGroupGameDays,
      scoresByPlayOffGameDays,
      pariScoresByGroupGameDays,
      pariScoresByPlayOffGameDays,
      doublePointsScoreByGroupGameDays,
    };
  });

  return usersWithScores;
};
