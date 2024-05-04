import { Match } from "../../../domains/Match";
import { Prediction } from "../../../domains/Prediction";
import { Result } from "../../../domains/Result";
import { User, UserId } from "../../../domains/User";
import {
  GAME_DAYS_GROUP,
  GAME_DAYS_PLAYOFF,
} from "../../../domains/GameRules/constants/constants";
import { calculatePredictionResult } from "../../../domains/GameRules/helpers/calculatePredictionResult";
import { calculatePredictionResultScore } from "../../../domains/GameRules/helpers/calculatePredictionResultScore";

type Params = {
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
};

export type UserWithScoresTotal = {
  id: UserId;
  name: string;
  totalScore: number;
  isWinner: boolean;
  winnerPrediction: string;
  exactScoresNumber: number;
  scoresByGroupGameDays: number[];
  scoresByPlayOffGameDays: number[];
  userGroupScore: number;
};

export const useUsersWithScoresTotal = ({
  matches,
  results,
  users,
  predictions,
}: Params): UserWithScoresTotal[] => {
  // Пробегаем по всем юзерам и возвращаем модель с посчитанными очками
  const usersWithScores = users.map((user) => {
    // Итоговое кол-во очков за турнир
    let userTotalScore: number = 0;
    // Кол-во точно угаданных результатов
    let exactScoresNumber: number = 0;
    // Итоговое кол-во очков за групповой этап
    let userGroupScore: number = 0;
    // Массив со значениями очков за игровые дни плейоффа, index - игровой день, значение - кол-во очков за игровой день
    const scoresByPlayOffGameDays = Array(GAME_DAYS_PLAYOFF).fill(0);
    // Массив со значениями очков за игровые дни группового этапа, index - игровой день, значение - кол-во очков за игровой день
    const scoresByGroupGameDays = Array(GAME_DAYS_GROUP).fill(0);

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

      // Если пользователь угадал точный счет, обновляем кол-во точно угаданных результатов
      if (userPredictionResult.matchState.type === "exact_score") {
        exactScoresNumber += 1;
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

      // Обновляем итоговое кол-во очков за турнир
      userTotalScore += score;
    });

    return {
      id: user.id,
      name: user.name,
      totalScore: userTotalScore,
      isWinner: user.lastWinner,
      winnerPrediction: user.winnerPrediction,
      exactScoresNumber,
      userGroupScore,
      scoresByGroupGameDays,
      scoresByPlayOffGameDays,
    };
  });

  usersWithScores.sort((a, b) => b.totalScore - a.totalScore);

  return usersWithScores;
};