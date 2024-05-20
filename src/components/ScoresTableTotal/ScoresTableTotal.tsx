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
import { GAME_DAYS_PLAYOFF } from "../../domains/GameRules/constants/constants";
import { useHighestScoresPerGameDay } from "../../hooks/useHighestScoresPerGameDay";
import { TableCellNameAvatar } from "../TableCellNameAvatar/TableCellNameAvatar";
import { CUSTOM_COLORS } from "../../styles/colors";
import { sortUsersByGameRules } from "../../domains/GameRules/helpers/sortUsersByGameRules";
import { useUserWIthTotalScoreByGameDay } from "../../hooks/useUserWIthTotalScoreByGameDay";
import { TableCellChangedPlace } from "../TableCellChangedPlace/TableCellChangedPlace";
import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { TABLE_CELL_STYLE } from "../../styles/tableCellStyle";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const ScoresTableTotal = (props: Props) => {
  const usersWithScores = useUsersWithScoresTotal({
    matches: props.matches,
    results: props.results,
    users: props.users,
    predictions: props.predictions,
  });

  const sortedUsersWithScores = usersWithScores.sort(sortUsersByGameRules);

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
          <TableCell align="center" style={{ padding: "4px" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell align="center" style={{ padding: "4px" }}>
            {user.index + 1}
          </TableCell>
          <TableCellChangedPlace
            userPositionPreviousGameDay={userPositionPreviousGameDay}
            index={user.index}
          />
          <TableCellNameAvatar
            name={user.user.name}
            isWinner={user.user.isWinner}
            avatar={user.user.avatar}
          />
          <TableCell align="center">{user.user.totalScore}</TableCell>
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
                    alt="United States"
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${user.user.winnerPrediction}.svg`}
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
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={TABLE_CELL_STYLE} />
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  М
                </TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}></TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  И
                </TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  О
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsersWithScores.map((user, index) => (
                <Row user={user} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  {isMediumScreen ? "М" : "Место"}
                </TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}></TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  {isMediumScreen ? "И" : "Имя"}
                </TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  {isMediumScreen ? (
                    "ПП"
                  ) : (
                    <>
                      Прогноз
                      <br />
                      на победителя
                    </>
                  )}
                </TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  {isMediumScreen ? (
                    "Р"
                  ) : (
                    <>
                      Точные
                      <br /> результаты
                    </>
                  )}
                </TableCell>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  {isMediumScreen ? (
                    "ГР"
                  ) : (
                    <>
                      Групповой
                      <br /> этап
                    </>
                  )}
                </TableCell>
                {Array(GAME_DAYS_PLAYOFF)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <TableCell align="center" style={TABLE_CELL_STYLE}>
                        {isMediumScreen ? (
                          index + 1
                        ) : (
                          <>
                            День <br />
                            {index + 1}
                          </>
                        )}
                      </TableCell>
                    );
                  })}
                <TableCell align="center" style={TABLE_CELL_STYLE}>
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
                    <TableCell align="center">
                      {user.exactScoresNumber}
                    </TableCell>
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
                              ? CUSTOM_COLORS.green
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
      )}

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
          <b>ПП</b>
          &nbsp;–&nbsp;прогноз на победителя,&nbsp;
          <b>Р</b>
          &nbsp;–&nbsp;точно угаданные результаты,&nbsp;
          <b>ГР</b>
          &nbsp;–&nbsp;очки за групповой этап,&nbsp;
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
