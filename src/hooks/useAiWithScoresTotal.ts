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
import { useCalculatePariScores } from "./useCalculatePariScores";

type Params = {
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
};

export type AiWithScoresTotal = {
  id: UserId;
  name: string;
  avatar: string;
  isAI: boolean;
  totalScore: number;
  isWinner: boolean;
  winnerCount: number;
  winnerPrediction: CountryId;
  doublePointsScore: number;
  pariScoresGroup: number;
  pariScoresPlayoff: number;
  pariScoresTotal: number;
  hotBallPointsScore: number;
  winnerPointsScore: number;
  exactScoresNumber: number;
  exactScoresNumberGroupStage: number;
  exactScoresNumberPlayoffStage: number;
  scoresByGroupGameDays: number[];
  scoresByPlayOffGameDays: number[];
  groupScore: number;
  playoffScore: number;
};

export const useAiWithScoresTotal = ({
  matches,
  results,
  users,
  predictions,
}: Params): AiWithScoresTotal => {
  const aiUser = users.find((user) => user.isAI);

  if (!aiUser) {
    throw new Error("AiUser not found.");
  }

  // Очки, которые набрали юзеры в паришках, не бот! (Очки бота = очки юзеров со знаком минус)
  const aiPariScoresGroup =
    -1 *
    useCalculatePariScores({
      predictions: predictions.filter(
        (prediction) => prediction.type === "group",
      ),
      results,
    });
  const aiPariScoresPlayoff =
    -1 *
    useCalculatePariScores({
      predictions: predictions.filter(
        (prediction) => prediction.type === "play_off",
      ),
      results,
    });
  const aiPariScoresTotal = aiPariScoresGroup + aiPariScoresPlayoff;

  let aiTotalScore: number = 0;
  // Кол-во очков полученных за матчи с двойными очками (групповой этап)
  let doublePointsScore: number = 0;
  // Кол-во точно угаданных результатов
  let exactScoresNumber: number = 0;
  // Кол-во точно угаданных групповых результатов
  let exactScoresNumberGroupStage: number = 0;
  // Кол-во точно угаданных плейофф результатов
  let exactScoresNumberPlayoffStage: number = 0;
  // Кол-во очков за hotBalls
  let hotBallPointsScoreTotal: number = 0;
  let winnerPointsScoreTotal: number = 0;
  // Итоговое кол-во очков за групповой этап
  let aiGroupScore: number = 0;
  // Итоговое кол-во очков за плейофф этап
  let aiPlayoffScore: number = 0;
  // Массив со значениями очков за игровые дни плейоффа, index - игровой день, значение - кол-во очков за игровой день
  const scoresByPlayOffGameDays = Array(GAME_DAYS_PLAYOFF).fill(0);
  // Массив со значениями очков за игровые дни группового этапа, index - игровой день, значение - кол-во очков за игровой день
  const scoresByGroupGameDays = Array(GAME_DAYS_GROUP).fill(0);

  // Получаем все прогнозы конкретного пользователя по его id ( мы внутри map!!!!!)
  const aiPredictions = predictions.filter((prediction) => {
    return prediction.userId === aiUser.id;
  });

  // Перебираем в цикле полученные шагом ранее прогнозы конкретного пользователя
  aiPredictions.forEach((aiPrediction) => {
    // Получаем результат матча, чтобы сопоставить его с прогнозом пользователя
    const resultMatch = results.find((result) => {
      return result.matchId === aiPrediction.matchId;
    });

    if (!resultMatch) {
      return;
    }

    // Если есть результат hotBalls, перезаписываем его
    if (aiUser.hotBallPoints) {
      hotBallPointsScoreTotal = aiUser.hotBallPoints;
    }

    if (aiUser.winnerPoints) {
      winnerPointsScoreTotal = aiUser.winnerPoints;
    }

    // Получаем данные матча,чтобы понять к какому игровому дню он относится
    const match = matches.find((match) => {
      return resultMatch.matchId === match.id;
    });

    if (!match) {
      return;
    }

    // Считаем исход прогноза пользователя по конкретному матчу
    const aiPredictionResult = calculatePredictionResult({
      prediction: aiPrediction,
      result: resultMatch,
    });

    // Считаем кол-во очков полученных за прогноз на конкретный матч
    const score = calculatePredictionResultScore({
      predictionResult: aiPredictionResult,
    });

    if (match.isDoublePoints) {
      doublePointsScore += score;
    }

    // Если пользователь угадал точный счет, обновляем кол-во точно угаданных результатов
    if (aiPredictionResult.matchState.type === "exact_score") {
      exactScoresNumber += 1;
    }

    // Если пользователь угадал точный счет в грпповом этапе, обновляем кол-во точно угаданных групповых результатов
    if (
      aiPredictionResult.type === "group" &&
      aiPredictionResult.matchState.type === "exact_score"
    ) {
      exactScoresNumberGroupStage += 1;
    }

    // Если пользователь угадал точный счет в плейофф этапе, обновляем кол-во точно угаданных плейофф результатов
    if (
      aiPredictionResult.type === "play_off" &&
      aiPredictionResult.matchState.type === "exact_score"
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
      aiGroupScore += score;
    }

    // Если матч плейофф, то записываем результат в переменную с итоговым кол-вом очков за плейофф этап
    if (match.type === "play_off") {
      aiPlayoffScore += score;
    }

    // Обновляем итоговое кол-во очков за турнир
    aiTotalScore += score;
  });

  return {
    id: aiUser.id,
    name: `${aiUser.name} ${aiUser.lastName}`,
    avatar: aiUser.photoUrl,
    isAI: aiUser.isAI,
    isWinner: aiUser.lastWinner,
    winnerCount: aiUser.winnerCount,
    winnerPrediction: aiUser.winnerPrediction,
    doublePointsScore,
    hotBallPointsScore: hotBallPointsScoreTotal,
    winnerPointsScore: winnerPointsScoreTotal,
    pariScoresGroup: aiPariScoresGroup,
    pariScoresPlayoff: aiPariScoresPlayoff,
    pariScoresTotal: aiPariScoresTotal,
    exactScoresNumber,
    exactScoresNumberGroupStage,
    exactScoresNumberPlayoffStage,
    groupScore:
      aiGroupScore +
      doublePointsScore +
      aiPariScoresGroup +
      hotBallPointsScoreTotal,
    playoffScore: aiPlayoffScore + aiPariScoresPlayoff,
    totalScore:
      aiTotalScore +
      doublePointsScore +
      aiPariScoresTotal +
      winnerPointsScoreTotal +
      hotBallPointsScoreTotal,
    scoresByGroupGameDays,
    scoresByPlayOffGameDays,
  };
};
