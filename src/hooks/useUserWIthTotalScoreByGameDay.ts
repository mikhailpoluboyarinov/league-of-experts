import { UserId } from "../domains/User";
import { GameDay } from "../domains/Match";
import { sortUsersByGameRules } from "../domains/GameRules/helpers/sortUsersByGameRules";

type Params = {
  usersWithScores: Array<{
    userId: UserId;
    scores: number[];
    groupScores: number;
    pariPoints: number[];
    doublePoints: number[];
    exactScoresNumber: number;
  }>;
  gameDay: GameDay;
  key: string;
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
    const score = userWithScores.scores
      .slice(0, gameDay)
      .reduce((acc, item) => acc + item, 0);

    const pariScore = userWithScores.pariPoints
      .slice(0, gameDay)
      .reduce((acc, item) => acc + item, 0);

    const doublePoints = userWithScores.doublePoints
      .slice(0, gameDay)
      .reduce((acc, item) => acc + item, 0);

    return {
      userId: userWithScores.userId,
      totalScore: userWithScores.groupScores + score + pariScore + doublePoints,
      exactScoresNumber: userWithScores.exactScoresNumber,
    };
  });

  mappedUserWithScores.sort(sortUsersByGameRules);

  return mappedUserWithScores;
};
