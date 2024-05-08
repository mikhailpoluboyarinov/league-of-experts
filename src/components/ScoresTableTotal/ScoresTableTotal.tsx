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
import { GAME_DAYS_PLAYOFF } from "../../domains/GameRules/constants/constants";
import { useHighestScoresPerGameDay } from "../../hooks/useHighestScoresPerGameDay";
import { TableCellNameAvatar } from "../TableCellNameAvatar/TableCellNameAvatar";
import { customColors } from "../../styles/colors";
import { sortUsersByGameRules } from "../../domains/GameRules/helpers/sortUsersByGameRules";
import { useUserWIthTotalScoreByGameDay } from "../../hooks/useUserWIthTotalScoreByGameDay";
import { TableCellChangedPlace } from "../TableCellChangedPlace/TableCellChangedPlace";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const ScoresTableTotal = (props: Props) => {
  const sortedUsersWithScores = useUsersWithScoresTotal({
    matches: props.matches,
    results: props.results,
    users: props.users,
    predictions: props.predictions,
  }).sort(sortUsersByGameRules);

  const highestScoresPerDayPlayoff = useHighestScoresPerGameDay(
    sortedUsersWithScores.map((user) => user.scoresByPlayOffGameDays),
  );

  const usersWIthTotalScoreByPreviousGameDay = useUserWIthTotalScoreByGameDay({
    usersWithScores: sortedUsersWithScores.map((userWithScore) => {
      return {
        userId: userWithScore.id,
        scores: userWithScore.scoresByPlayOffGameDays,
        exactScoresNumber: userWithScore.exactScoresNumber,
      };
    }),
    gameDay: Math.min(props.currentGameDay - 1, GAME_DAYS_PLAYOFF) as GameDay,
  });

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Место</TableCell>
              <TableCell align="center">Изменение места</TableCell>
              <TableCell align="center">Имя</TableCell>
              <TableCell align="center">Прогноз на победителя</TableCell>
              <TableCell align="center">Точный результаты</TableCell>
              <TableCell align="center">Групповой этап</TableCell>
              {Array(GAME_DAYS_PLAYOFF)
                .fill(0)
                .map((item, index) => {
                  return (
                    <TableCell align="center">
                      Плейофф {index + 1} день
                    </TableCell>
                  );
                })}
              <TableCell align="center">Очки</TableCell>
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
                  <TableCell align="center">
                    <img
                      width={30}
                      height={30}
                      alt="United States"
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${user.winnerPrediction}.svg`}
                    />
                  </TableCell>
                  <TableCell align="center">{user.exactScoresNumber}</TableCell>
                  <TableCell align="center">{user.userGroupScore}</TableCell>
                  {user.scoresByPlayOffGameDays.map((score, index) => {
                    const isUserWithHighestScorePerDay =
                      highestScoresPerDayPlayoff[index] &&
                      highestScoresPerDayPlayoff[index] === score;
                    return (
                      <TableCell
                        align="center"
                        style={{
                          backgroundColor: isUserWithHighestScorePerDay
                            ? customColors.green
                            : "inherit",
                        }}
                      >
                        {score}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">{user.totalScore}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
