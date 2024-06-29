export const calculatePariScoreGroup = ({
  userScore,
  aiScore,
}: {
  userScore: number;
  aiScore: number;
}): number => {
  if (userScore > aiScore) {
    return 3;
  } else if (userScore < aiScore) {
    return -3;
  }
  return 0;
};
