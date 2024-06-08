import { Country, CountryId } from "../../domains/Country";
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
import { useAiWithScoresTotal } from "../../hooks/useAiWithScoresTotal";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const ScoresTableTotal = (props: Props) => {
  const usersWithScoresWithoutAi = useUsersWithScoresTotal({
    matches: props.matches,
    results: props.results,
    users: props.users,
    predictions: props.predictions,
  });

  const aiWithScore = useAiWithScoresTotal({
    matches: props.matches,
    results: props.results,
    users: props.users,
    predictions: props.predictions,
  });

  const sortedUsersWithScores =
    usersWithScoresWithoutAi.sort(sortUsersByGameRules);

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
    gameDay: Math.min(
      props.currentGameDay - GAME_DAYS_GROUP - 1,
      GAME_DAYS_PLAYOFF,
    ) as GameDay,
  });

  const getCountryFlagUrl = (id: CountryId) => {
    const country = props.countries.find((country) => country.id === id);

    if (!country) {
      return;
    }

    return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`;
  };

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
          <TableCell align="center" style={{ padding: "4px", width: "10%" }}>
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
                  Кол-во оставшихся пари:
                  <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                    {user.user.pariCount}
                  </span>
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                  Очки за Пари:
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
                    alt="United States"
                    src={getCountryFlagUrl(user.user.winnerPrediction)}
                  />
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  /*Отрисовка таблицы для бота*/
  const RowAi = (user: any) => {
    const [open, setOpen] = useState(false);

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
          <TableCell align="center" style={{ padding: "4px", width: "5%" }}>
            -
          </TableCell>
          <TableCell align="center" style={{ padding: "4px", width: "10%" }} />
          <TableCellNameAvatar
            name={"Ai"}
            isWinner={user.user.isWinner}
            avatar={user.user.avatar}
            winnerCount={user.user.winnerCount}
          />
          <TableCell align="center" style={{ padding: "4px", width: "25%" }}>
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
                  Очки за Пари:
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
                    alt="United States"
                    src={getCountryFlagUrl(user.user.winnerPrediction)}
                  />
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };
  /*Закончилась отрисовка таблицы для бота*/

  return (
    <>
      {isSmallScreen ? (
        <TableContainer
          component={Paper}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        >
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
        <TableContainer
          component={Paper}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        >
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "5%" }}
                >
                  {isMediumScreen ? "М" : "Место"}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "5%" }}
                ></TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "17%" }}
                >
                  {isMediumScreen ? "И" : "Имя"}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "8%" }}
                >
                  {isMediumScreen ? (
                    "ПП"
                  ) : (
                    <>
                      Прогноз
                      <br />
                      победителя
                    </>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "8%" }}
                >
                  {isMediumScreen ? (
                    "Р"
                  ) : (
                    <>
                      Точные
                      <br /> результаты
                    </>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "8%" }}
                >
                  {isMediumScreen ? (
                    "П"
                  ) : (
                    <>
                      Осталось
                      <br /> Пари
                    </>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "8%" }}
                >
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
                      <TableCell
                        align="center"
                        style={{ ...TABLE_CELL_STYLE, width: "4%" }}
                      >
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
                <TableCell
                  align="center"
                  style={{ ...TABLE_CELL_STYLE, width: "5%" }}
                >
                  {isMediumScreen ? (
                    "ОП"
                  ) : (
                    <>
                      Очки
                      <br />
                      пари
                    </>
                  )}
                </TableCell>
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
                  <TableRow key={user.id}>
                    <TableCell align="center" style={{ width: "5%" }}>
                      {index + 1}
                    </TableCell>
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
                    <TableCell align="center" style={{ width: "8%" }}>
                      <img
                        width={30}
                        height={30}
                        alt="United States"
                        src={getCountryFlagUrl(user.winnerPrediction)}
                      />
                    </TableCell>
                    <TableCell align="center" style={{ width: "8%" }}>
                      {user.exactScoresNumber}
                    </TableCell>
                    <TableCell align="center" style={{ width: "8%" }}>
                      {user.pariCount}
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
                    <TableCell align="center" style={{ width: "5%" }}>
                      {user.pariPointsScore}
                    </TableCell>
                    <TableCell align="center" style={{ width: "7%" }}>
                      {user.totalScore}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/*Таблица для AI бота*/}
      {isSmallScreen ? (
        <TableContainer
          component={Paper}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            marginTop: "10px",
          }}
        >
          <Table aria-label="collapsible table">
            <TableBody>
              {aiWithScore.map((user, index) => (
                <RowAi user={user} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer
          component={Paper}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            marginTop: "10px",
          }}
        >
          <Table size="small" aria-label="simple table">
            <TableBody>
              {aiWithScore.map((user, index) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell
                      align="center"
                      style={{ padding: "4px", width: "5%" }}
                    >
                      -
                    </TableCell>
                    <TableCell style={{ width: "5%" }} />
                    <TableCellNameAvatar
                      name={"Ai"}
                      isWinner={user.isWinner}
                      avatar={user.avatar}
                      winnerCount={user.winnerCount}
                    />
                    <TableCell align="center" style={{ width: "8%" }}>
                      <img
                        width={30}
                        height={30}
                        alt="United States"
                        src={getCountryFlagUrl(user.winnerPrediction)}
                      />
                    </TableCell>
                    <TableCell align="center" style={{ width: "8%" }}>
                      {user.exactScoresNumber}
                    </TableCell>
                    <TableCell align="center" style={{ width: "8%" }}>
                      -
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
                    <TableCell align="center" style={{ width: "5%" }}>
                      {user.pariPointsScore}
                    </TableCell>
                    <TableCell align="center" style={{ width: "7%" }}>
                      {user.totalScore}
                    </TableCell>
                  </TableRow>
                );
              })}
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
          <b>П</b>
          &nbsp;–&nbsp;кол-во оставшихся пари,&nbsp;
          <b>ГР</b>
          &nbsp;–&nbsp;очки за групповой этап,&nbsp;
          <b>[1, ... ]</b>
          &nbsp;–&nbsp;день плейоффа,&nbsp;
          <b>ОП</b>
          &nbsp;–&nbsp;очки за Пари&nbsp;
          <b>О</b>
          &nbsp;–&nbsp;очки&nbsp;
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};
