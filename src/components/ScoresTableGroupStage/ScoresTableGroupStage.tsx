import React, {useState} from "react";

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
  Paper,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { GAME_DAYS_GROUP } from "../../domains/GameRules/constants/constants";
import { useHighestScoresPerGameDay } from "../../hooks/useHighestScoresPerGameDay";
import { useUserWIthTotalScoreByGameDay } from "../../hooks/useUserWIthTotalScoreByGameDay";
import { TableCellChangedPlace } from "../TableCellChangedPlace/TableCellChangedPlace";
import { TableCellNameAvatar } from "../TableCellNameAvatar/TableCellNameAvatar";
import { CUSTOM_COLORS } from "../../styles/colors";
import { sortUsersByGameRulesGroupStage } from "../../domains/GameRules/helpers/sortUsersByGameRulesGroupStage";
import { TABLE_CELL_STYLE } from "../../styles/tableCellStyle";
import {getColorByPlace} from "../../domains/GameRules/helpers/getColorByPlace";
import {AiRowGroupStage} from "./AiRowGroupStage";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const ScoresTableGroupStage = ({ countries, results, users, predictions, matches, currentGameDay }: Props) => {
  const usersWithScores = useUsersWithScoresTotal({
    matches,
    results,
    users,
    predictions,
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
    gameDay: Math.min(currentGameDay - 1, GAME_DAYS_GROUP) as GameDay,
  });

  const highestScoresPerDayGroup = useHighestScoresPerGameDay(
    sortedUsersWithScores.map((user) => user.scoresByGroupGameDays),
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
                Array(GAME_DAYS_GROUP)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <TableCell
                        key={index}
                        align="center"
                        style={TABLE_CELL_STYLE}
                      >
                        {isMediumScreen ? index + 1 : `День ${index + 1}`}
                      </TableCell>
                    );
                  })}
              <TableCell align="center" style={{...TABLE_CELL_STYLE, color: CUSTOM_COLORS.orange }}>
                {isMediumScreen ? "X2" : "Очки X2"}
              </TableCell>
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
                    user.scoresByGroupGameDays.map((score, index) => {
                      const isUserWithHighestScorePerDay =
                        highestScoresPerDayGroup[index] &&
                        highestScoresPerDayGroup[index] === score;
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
                  <TableCell align="center" style={{ fontWeight: "bold", color: CUSTOM_COLORS.orange }}>{user.doublePointsScore}</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold", color: CUSTOM_COLORS.orange }}>{user.pariPointsScore}</TableCell>
                  <TableCell align="center">{user.userGroupScore}</TableCell>
                </TableRow>
              );
            })}

            {/*Строка таблицы для AI бота*/}
            <AiRowGroupStage
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
          <b>X2</b>
          &nbsp;–&nbsp;двойные очки,&nbsp;
          <b>И</b>
          &nbsp;–&nbsp;итого&nbsp;
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
          <b>X2</b>
          &nbsp;–&nbsp;двойные очки,&nbsp;
          <b>[1, ... ]</b>
          &nbsp;–&nbsp;день группового этапа,&nbsp;
          <b>П</b>
          &nbsp;–&nbsp;очки за пари&nbsp;
          <b>И</b>
          &nbsp;–&nbsp;итого&nbsp;
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};
