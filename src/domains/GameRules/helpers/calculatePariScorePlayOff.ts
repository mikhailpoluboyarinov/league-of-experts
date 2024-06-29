export const calculatePariScorePlayOff = ({
  userScore,
  aiScore,
}: {
  userScore: number;
  aiScore: number;
}): number => {
  if (userScore > aiScore) {
    return 6;
  } else if (userScore < aiScore) {
    return -6;
  }
  return 0;
};
