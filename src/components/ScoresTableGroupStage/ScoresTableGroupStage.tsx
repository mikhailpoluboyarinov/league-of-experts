import { Country } from "../../domains/Country";
import { GameDay, Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";
import { useUsersWithScoresTotal } from "../../hooks/useUsersWithScoresTotal";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { GAME_DAYS_GROUP } from "../../domains/GameRules/constants/constants";
import { useHighestScoresPerGameDay } from "../../hooks/useHighestScoresPerGameDay";
import { useUserWIthTotalScoreByGameDay } from "../../hooks/useUserWIthTotalScoreByGameDay";
import { TableCellChangedPlace } from "../TableCellChangedPlace/TableCellChangedPlace";
import { TableCellNameAvatar } from "../TableCellNameAvatar/TableCellNameAvatar";
import { CUSTOM_COLORS } from "../../styles/colors";
import { sortUsersByGameRulesGroupStage } from "../../domains/GameRules/helpers/sortUsersByGameRulesGroupStage";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const ScoresTableGroupStage = (props: Props) => {
  const usersWithScores = useUsersWithScoresTotal({
    matches: props.matches,
    results: props.results,
    users: props.users,
    predictions: props.predictions,
  });

  const sortedUsersWithScores = usersWithScores.sort(
    sortUsersByGameRulesGroupStage,
  );

  const usersWIthTotalScoreByPreviousGameDay = useUserWIthTotalScoreByGameDay({
    usersWithScores: sortedUsersWithScores.map((userWithScore) => {
      return {
        userId: userWithScore.id,
        scores: userWithScore.scoresByGroupGameDays,
        exactScoresNumber: userWithScore.exactScoresNumber,
      };
    }),
    gameDay: Math.min(props.currentGameDay - 1, GAME_DAYS_GROUP) as GameDay,
  });

  const highestScoresPerDayGroup = useHighestScoresPerGameDay(
    sortedUsersWithScores.map((user) => user.scoresByGroupGameDays),
  );

  console.log("sortedUsersWithScores", sortedUsersWithScores);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Место</TableCell>
              <TableCell align="center">Изменение места</TableCell>
              <TableCell align="center">Имя</TableCell>
              {Array(GAME_DAYS_GROUP)
                .fill(0)
                .map((item, index) => {
                  return <TableCell align="center">День {index + 1}</TableCell>;
                })}
              <TableCell align="center">Очки группового этапа</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsersWithScores.map((user, index) => {
              const userPositionPreviousGameDay =
                usersWIthTotalScoreByPreviousGameDay.findIndex(
                  (item) => item.userId === user.id,
                );

              return (
                <TableRow>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCellChangedPlace
                    userPositionPreviousGameDay={userPositionPreviousGameDay}
                    index={index}
                  />
                  <TableCellNameAvatar
                    name={user.name}
                    isWinner={user.isWinner}
                    avatar={user.avatar}
                  />
                  {user.scoresByGroupGameDays.map((score, index) => {
                    const isUserWithHighestScorePerDay =
                      highestScoresPerDayGroup[index] &&
                      highestScoresPerDayGroup[index] === score;
                    return (
                      <TableCell
                        align="center"
                        style={{
                          backgroundColor: isUserWithHighestScorePerDay
                            ? CUSTOM_COLORS.green
                            : "inherit",
                        }}
                      >
                        {score}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">{user.userGroupScore}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
