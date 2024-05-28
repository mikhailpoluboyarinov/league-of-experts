import { Match } from "../domains/Match";

export const useUpcomingMatchesAfterClosedForPrediction = (
  matches: Match[],
): Match[] => {
  const getLastMatchWithClosedForPrediction = matches
    .map((match) => match.isClosedForPrediction)
    .lastIndexOf(true);

  if (getLastMatchWithClosedForPrediction !== -1) {
    return matches.slice(getLastMatchWithClosedForPrediction + 1);
  }
  return [];
};
