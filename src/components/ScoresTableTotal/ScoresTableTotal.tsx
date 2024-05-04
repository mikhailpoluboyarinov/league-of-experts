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
import { GAME_DAYS_PLAYOFF } from "../../domains/GameRules/constants/constants";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
};
export const ScoresTableTotal = (props: Props) => {
  const usersWithScores = useUsersWithScoresTotal({
    matches: props.matches,
    results: props.results,
    users: props.users,
    predictions: props.predictions,
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
            {usersWithScores.map((user, index) => (
              <TableRow>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">1+</TableCell>
                <TableCell
                  style={{
                    backgroundColor: user.isWinner ? "lightblue" : "inherit",
                  }}
                  align="center"
                >
                  {user.name}
                </TableCell>
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
                {user.scoresByPlayOffGameDays.map((score) => {
                  return <TableCell align="center">{score}</TableCell>;
                })}
                <TableCell align="center">{user.totalScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
