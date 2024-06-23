import { Prediction } from "../domains/Prediction";

export const calculatePredictionPercentages = (predictions: Prediction[]) => {
  const predictionsWithoutAi = predictions.filter(
    (prediction) => !prediction.isAIPrediction,
  );

  const totalPredictions = predictionsWithoutAi.length;
  const hostWins = predictionsWithoutAi.filter(
    (prediction) => prediction.hostScore > prediction.guestScore,
  ).length;
  const guestWins = predictionsWithoutAi.filter(
    (prediction) => prediction.hostScore < prediction.guestScore,
  ).length;
  const draw = predictionsWithoutAi.filter(
    (prediction) => prediction.hostScore === prediction.guestScore,
  ).length;

  const hostWinPercentage = (hostWins / totalPredictions) * 100;
  const guestWinPercentage = (guestWins / totalPredictions) * 100;
  const drawPercentage = (draw / totalPredictions) * 100;

  return {
    hostWinPercentage,
    guestWinPercentage,
    drawPercentage,
  };
};
