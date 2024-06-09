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
  useMediaQuery,
  Paper,
  Typography,
} from "@mui/material";
import {
  GAME_DAYS_GROUP,
  GAME_DAYS_PLAYOFF,
} from "../../domains/GameRules/constants/constants";
import { useHighestScoresPerGameDay } from "../../hooks/useHighestScoresPerGameDay";
import { TableCellChangedPlace } from "../TableCellChangedPlace/TableCellChangedPlace";
import { useUserWIthTotalScoreByGameDay } from "../../hooks/useUserWIthTotalScoreByGameDay";
import { TableCellNameAvatar } from "../TableCellNameAvatar/TableCellNameAvatar";
import { CUSTOM_COLORS } from "../../styles/colors";
import { sortUsersByGameRulesPlayoffStage } from "../../domains/GameRules/helpers/sortUsersByGameRulesPlayoffStage";
import { TABLE_CELL_STYLE } from "../../styles/tableCellStyle";
import React from "react";
import {getColorByPlace} from "../../domains/GameRules/helpers/getColorByPlace";
import {AiRowGroupStage} from "../ScoresTableGroupStage/AiRowGroupStage";
import {AiRowPlayoffStage} from "./AiRowPlayoffStage";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const ScoresTablePlayoffStage = ({ countries, matches, results, users, predictions, currentGameDay }: Props) => {
  const usersWithScores = useUsersWithScoresTotal({
    matches,
    results,
    users,
    predictions,
  });

  const sortedUsersWithScores = usersWithScores.sort(
    sortUsersByGameRulesPlayoffStage,
  );

  const usersWIthTotalScoreByPreviousGameDay = useUserWIthTotalScoreByGameDay({
    usersWithScores: sortedUsersWithScores.map((userWithScore) => {
      return {
        userId: userWithScore.id,
        scores: userWithScore.scoresByPlayOffGameDays,
        exactScoresNumber: userWithScore.exactScoresNumber,
      };
    }),
    gameDay: Math.min(
      currentGameDay - GAME_DAYS_GROUP - 1,
      GAME_DAYS_PLAYOFF,
    ) as GameDay,
  });

  const highestScoresPerDayPlayoff = useHighestScoresPerGameDay(
    sortedUsersWithScores.map((user) => user.scoresByPlayOffGameDays),
  );

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 651px) and (max-width: 1050px)",
  );
  const isNotSmallScreen = useMediaQuery("(min-width: 651px)");

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={TABLE_CELL_STYLE}>
                {isMediumScreen ? "М" : "Место"}
              </TableCell>
              <TableCell align="center" style={TABLE_CELL_STYLE}></TableCell>
              <TableCell style={TABLE_CELL_STYLE}>
                {isMediumScreen ? "" : "Эксперт"}
              </TableCell>
              <TableCell align="center" style={TABLE_CELL_STYLE}>
                {isMediumScreen ? "T" : "Точные счета"}
              </TableCell>
              {isNotSmallScreen &&
                Array(GAME_DAYS_PLAYOFF)
                  .fill(0)
                  .map((item, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      style={TABLE_CELL_STYLE}
                    >
                      {isMediumScreen ? index + 1 : `День ${index + 1}`}
                    </TableCell>
                  ))}
              <TableCell align="center" style={{...TABLE_CELL_STYLE, color: CUSTOM_COLORS.orange }}>
                {isMediumScreen ? "П" : "Пари"}
              </TableCell>
              <TableCell align="center" style={TABLE_CELL_STYLE}>
                {isMediumScreen ? "О" : "Итого"}
              </TableCell>
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
                  <TableCell align="center" style={{backgroundColor: getColorByPlace(sortedUsersWithScores.length, index + 1) }}>{index + 1}</TableCell>
                  <TableCellChangedPlace
                    userPositionPreviousGameDay={userPositionPreviousGameDay}
                    index={index}
                  />
                  <TableCellNameAvatar
                    name={user.name}
                    isWinner={user.isWinner}
                    avatar={user.avatar}
                    winnerCount={user.winnerCount}
                  />
                  <TableCell align="center">{user.exactScoresNumber}</TableCell>
                  {isNotSmallScreen &&
                    user.scoresByPlayOffGameDays.map((score, index) => {
                      const isUserWithHighestScorePerDay =
                        highestScoresPerDayPlayoff[index] &&
                        highestScoresPerDayPlayoff[index] === score;
                      return (
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: isUserWithHighestScorePerDay
                              ? CUSTOM_COLORS.lightGreen
                              : "inherit",
                          }}
                        >
                          {score}
                        </TableCell>
                      );
                    })}
                  <TableCell align="center" style={{ fontWeight: "bold", color: CUSTOM_COLORS.orange }}>{user.pariPointsScore}</TableCell>
                  <TableCell align="center">{user.userPlayoffScore}</TableCell>
                </TableRow>
              );
            })}

            {/*Строка таблицы для AI бота*/}
            <AiRowPlayoffStage
                countries={countries}
                results={results}
                users={users}
                currentGameDay={currentGameDay}
                matches={matches}
                predictions={predictions}
            />
          </TableBody>
        </Table>
      </TableContainer>

      {isSmallScreen ? (
        <Typography
          align="left"
          gutterBottom
          style={{
            paddingTop: "10px",
            fontSize: "11px",
          }}
        >
          <b>М</b>
          &nbsp;–&nbsp;матчи,&nbsp;
          <b>И</b>
          &nbsp;–&nbsp;имя,&nbsp;
          <b>О</b>
          &nbsp;–&nbsp;очки&nbsp;
        </Typography>
      ) : (
        ""
      )}

      {isMediumScreen ? (
        <Typography
          align="left"
          gutterBottom
          style={{
            paddingTop: "10px",
            fontSize: "11px",
          }}
        >
          <b>М</b>
          &nbsp;–&nbsp;матчи,&nbsp;
          <b>И</b>
          &nbsp;–&nbsp;имя,&nbsp;
          <b>[1, ... ]</b>
          &nbsp;–&nbsp;день плейоффа,&nbsp;
          <b>О</b>
          &nbsp;–&nbsp;очки&nbsp;
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};
