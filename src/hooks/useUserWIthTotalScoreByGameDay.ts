import { UserId } from "../domains/User";
import { GameDay } from "../domains/Match";
import { sortUsersByGameRules } from "../domains/GameRules/helpers/sortUsersByGameRules";

type Params = {
  usersWithScores: Array<{
    userId: UserId;
    scores: number[];
    doublePoints: number
    pariPoints: number
    exactScoresNumber: number;
  }>;
  gameDay: GameDay;
};

type Output = Array<{
  userId: UserId;
  totalScore: number;
  exactScoresNumber: number;
}>;

export const useUserWIthTotalScoreByGameDay = ({
  usersWithScores,
  gameDay,
}: Params): Output => {
  const mappedUserWithScores = usersWithScores.map((userWithScores) => {
    return {
      userId: userWithScores.userId,
      totalScore: userWithScores.scores
        .slice(0, gameDay)
        .reduce((acc, item) => acc + item, 0) + userWithScores.doublePoints + userWithScores.pariPoints,
      exactScoresNumber: userWithScores.exactScoresNumber
    };
  });

  mappedUserWithScores.sort(sortUsersByGameRules);

  return mappedUserWithScores;
};
