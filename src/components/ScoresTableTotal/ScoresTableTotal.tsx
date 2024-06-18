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
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import {
  GAME_DAYS_GROUP,
  GAME_DAYS_PLAYOFF,
} from "../../domains/GameRules/constants/constants";
import { useHighestScoresPerGameDay } from "../../hooks/useHighestScoresPerGameDay";
import { TableCellNameAvatar } from "../TableCellNameAvatar/TableCellNameAvatar";
import { CUSTOM_COLORS } from "../../styles/colors";
import { sortUsersByGameRules } from "../../domains/GameRules/helpers/sortUsersByGameRules";
import { useUserWIthTotalScoreByGameDay } from "../../hooks/useUserWIthTotalScoreByGameDay";
import { TableCellChangedPlace } from "../TableCellChangedPlace/TableCellChangedPlace";
import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { TABLE_CELL_STYLE } from "../../styles/tableCellStyle";
import { getColorByPlace } from "../../domains/GameRules/helpers/getColorByPlace";
import { getCountryFlagUrlById } from "../../domains/Country/helpers/getCountryFlagUrlById";
import { AiRowTotal } from "./AiRowTotal";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const ScoresTableTotal = ({
  countries,
  matches,
  results,
  users,
  predictions,
  currentGameDay,
}: Props) => {
  const usersWithScores = useUsersWithScoresTotal({
    matches,
    results,
    users,
    predictions,
  });

  const sortedUsersWithScores =
      usersWithScores.slice().sort(sortUsersByGameRules);

  const highestScoresPerDayPlayoff = useHighestScoresPerGameDay(
    sortedUsersWithScores.map((user) => user.scoresByPlayOffGameDays),
  );

  const isGroupGameDay = currentGameDay <= GAME_DAYS_GROUP

  const usersWIthTotalScoreByPreviousGameDay = useUserWIthTotalScoreByGameDay({
    usersWithScores: usersWithScores.map((userWithScore) => {
      return {
        userId: userWithScore.id,
        scores: isGroupGameDay ? userWithScore.scoresByGroupGameDays : userWithScore.scoresByPlayOffGameDays,
        doublePoints: userWithScore.doublePointsScoreByGroupGameDays,
        pariPoints: isGroupGameDay ? userWithScore.pariScoresByGroupGameDays : userWithScore.pariScoresByPlayOffGameDays,
        exactScoresNumber: userWithScore.exactScoresNumber,
      };
    }),
    gameDay: isGroupGameDay ?
        currentGameDay - 1 as GameDay :
        currentGameDay - GAME_DAYS_GROUP - 1 as GameDay,
  });

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 651px) and (max-width: 1050px)",
  );

  const Row = (user: any) => {
    const [open, setOpen] = useState(false);

    const userPositionPreviousGameDay =
      usersWIthTotalScoreByPreviousGameDay.findIndex(
        (item) => item.userId === user.user.id,
      );

    return (
      <>
        <TableRow>
          <TableCell align="center" style={{ padding: "4px", width: "5%" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell
            align="center"
            style={{
              padding: "4px",
              width: "10%",
              backgroundColor: getColorByPlace(
                sortedUsersWithScores.length,
                user.index + 1,
              ),
            }}
          >
            {user.index + 1}
          </TableCell>
          <TableCellChangedPlace
            userPositionPreviousGameDay={userPositionPreviousGameDay}
            index={user.index}
          />
          <TableCellNameAvatar
            id={user.user.id}
            name={user.user.name}
            isWinner={user.user.isWinner}
            avatar={user.user.avatar}
            winnerCount={user.user.winnerCount}
          />
          <TableCell align="center" style={{ width: "25%" }}>
            {user.user.totalScore}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="subtitle2" gutterBottom component="div">
                  Очки за групповой этап:
                  <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                    {user.user.userGroupScore}
                  </span>
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                  Пари:
                  <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                    {user.user.pariPointsScore}
                  </span>
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                  Точно угаданных результатов:
                  <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                    {user.user.exactScoresNumber}
                  </span>
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  Прогноз на победителя:{" "}
                  <img
                    style={{ marginLeft: "15px" }}
                    width={30}
                    height={30}
                    alt="flag"
                    src={getCountryFlagUrlById(
                      countries,
                      user.user.winnerPrediction,
                    )}
                  />
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      {isSmallScreen ? (
        <TableContainer
          component={Paper}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={TABLE_CELL_STYLE} />
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  М
                </TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}></TableCell>
                <TableCell style={TABLE_CELL_STYLE}>Эксперт</TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  О
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsersWithScores.map((user, index) => (
                <Row user={user} index={index} />
              ))}
              <AiRowTotal
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
      ) : (
        <TableContainer
          component={Paper}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: CUSTOM_COLORS.lightGrey }}>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "5%" }}
                >
                  {isMediumScreen ? "М" : "Место"}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "3%" }}
                ></TableCell>
                <TableCell style={{ ...TABLE_CELL_STYLE, width: "17%" }}>
                  {isMediumScreen ? "Э" : "Эксперт"}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "8%" }}
                >
                  {isMediumScreen ? "ПП" : "Прогноз победителя"}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "8%" }}
                >
                  {isMediumScreen ? "Р" : "Точные результаты"}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "8%" }}
                >
                  {isMediumScreen ? "ГР" : "Групповой этап"}
                </TableCell>
                {Array(GAME_DAYS_PLAYOFF)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <TableCell
                        align="center"
                        style={{ ...TABLE_CELL_STYLE, width: "4%" }}
                      >
                        {isMediumScreen ? index + 1 : `День ${index + 1}`}
                      </TableCell>
                    );
                  })}

                {
                  /*
                  <TableCell
              align="center"
              style={{
                ...TABLE_CELL_STYLE,
                color: CUSTOM_COLORS.orange,
                width: "5%",
              }}
            >
              {isMediumScreen ? "П" : "Пари"}
            </TableCell>
                   */
                }
            <TableCell
              align="center"
              style={{ ...TABLE_CELL_STYLE, width: "7%" }}
            >
              {isMediumScreen ? "О" : "Очки"}
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
              <TableRow
                key={user.id}
                style={{ backgroundColor: CUSTOM_COLORS.lightGrey }}
              >
                <TableCell
                  align="center"
                  style={{
                    width: "5%",
                    backgroundColor: getColorByPlace(
                      sortedUsersWithScores.length,
                      index + 1,
                    ),
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCellChangedPlace
                  userPositionPreviousGameDay={userPositionPreviousGameDay}
                  index={index}
                />
                <TableCellNameAvatar
                  id={user.id}
                  name={user.name}
                  isWinner={user.isWinner}
                  avatar={user.avatar}
                  winnerCount={user.winnerCount}
                />
                <TableCell align="center" style={{ width: "8%" }}>
                  <img
                    width={30}
                    height={30}
                    alt="flag"
                    src={getCountryFlagUrlById(
                      countries,
                      user.winnerPrediction,
                    )}
                  />
                </TableCell>
                <TableCell align="center" style={{ width: "8%" }}>
                  {user.exactScoresNumber}
                </TableCell>
                <TableCell align="center" style={{ width: "8%" }}>
                  {user.userGroupScore}
                </TableCell>
                {user.scoresByPlayOffGameDays.map((score, index) => {
                  const isUserWithHighestScorePerDay =
                    highestScoresPerDayPlayoff[index] &&
                    highestScoresPerDayPlayoff[index] === score;
                  return (
                    <TableCell
                      key={index}
                      align="center"
                      style={{
                        width: "4%",
                        backgroundColor: isUserWithHighestScorePerDay
                          ? CUSTOM_COLORS.lightGreen
                          : "inherit",
                      }}
                    >
                      {score}
                    </TableCell>
                  );
                })}
                {
                  /*
                <TableCell
                  align="center"
                  style={{ color: CUSTOM_COLORS.orange, width: "5%" }}
                >
                  {user.pariPointsScore}
                </TableCell>
                   */
                    }
                    <TableCell align="center" style={{ width: "7%" }}>
                      {user.totalScore}
                    </TableCell>
                  </TableRow>
                );
              })}
              {/*Строка таблицы для AI бота*/}
              <AiRowTotal
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
      )}

      {/*Приписки после таблицы с расшифровкой сокращений*/}
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
          &nbsp;–&nbsp;место,&nbsp;
          <b>Э</b>
          &nbsp;–&nbsp;эксперт,&nbsp;
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
          &nbsp;–&nbsp;место,&nbsp;
          <b>Э</b>
          &nbsp;–&nbsp;эксперт,&nbsp;
          <b>ПП</b>
          &nbsp;–&nbsp;прогноз на победителя,&nbsp;
          <b>Р</b>
          &nbsp;–&nbsp;точно угаданные результаты,&nbsp;
          <b>ГР</b>
          &nbsp;–&nbsp;очки за групповой этап,&nbsp;
          <b>[1, ... ]</b>
          &nbsp;–&nbsp;день плейоффа,&nbsp;
          <b>П</b>
          &nbsp;–&nbsp;пари&nbsp;
          <b>О</b>
          &nbsp;–&nbsp;очки&nbsp;
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};
