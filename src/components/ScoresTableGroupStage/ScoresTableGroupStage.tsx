import { Country } from "../../domains/Country";
import { Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";
import { useUsersWithScoresTotal } from "../../pages/Main/hooks/useUsersWithScoresTotal";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { GAME_DAYS_GROUP } from "../../domains/GameRules/constants/constants";
import { useHighestScoresPerGameDay } from "../../pages/Main/hooks/useHighestScoresPerGameDay";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
};
export const ScoresTableGroupStage = (props: Props) => {
  const usersWithScores = useUsersWithScoresTotal({
    matches: props.matches,
    results: props.results,
    users: props.users,
    predictions: props.predictions,
  });

  //Создаем массив длинной равной длинне scoresByGroupGameDays

  const highestScoresPerDayGroup = useHighestScoresPerGameDay(
    usersWithScores.map((user) => user.scoresByGroupGameDays),
  );

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Место</TableCell>
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
            {usersWithScores.map((user, index) => (
              <TableRow>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell
                  style={{
                    backgroundColor: user.isWinner ? "lightblue" : "inherit",
                  }}
                  align="center"
                >
                  {user.name}
                </TableCell>
                {user.scoresByGroupGameDays.map((score, index) => {
                  const isUserWithHighestScorePerDay =
                    highestScoresPerDayGroup[index] &&
                    highestScoresPerDayGroup[index] === score;
                  return (
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: isUserWithHighestScorePerDay
                          ? "lightblue"
                          : "inherit",
                      }}
                    >
                      {score}
                    </TableCell>
                  );
                })}
                <TableCell align="center">{user.userGroupScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
