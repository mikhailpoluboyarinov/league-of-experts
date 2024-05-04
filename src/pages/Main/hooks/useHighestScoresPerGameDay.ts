export const useHighestScoresPerGameDay = (
  scores: Array<number[]>,
): number[] => {
  return Array(scores.length)
    .fill(0)
    .map((_, index) => {
      // Получаем наибольшее значение для текущего дня
      return scores.reduce(
        (prev, curr) => (curr[index] > prev ? curr[index] : prev),
        0,
      );
    });
};
