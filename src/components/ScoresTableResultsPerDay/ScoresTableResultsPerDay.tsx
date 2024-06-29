import { Country } from "../../domains/Country";
import { GameDay, Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { TABLE_CELL_STYLE } from "../../styles/tableCellStyle";
import { calculatePredictionResult } from "../../domains/GameRules/helpers/calculatePredictionResult";
import { getColorByPredictionResult } from "../../domains/GameRules/helpers/getColorByPredictionResult";
import { calculatePredictionResultScore } from "../../domains/GameRules/helpers/calculatePredictionResultScore";
import { useState } from "react";
import { CUSTOM_COLORS } from "../../styles/colors";
import IconDice from "../../images/icon_casino2.svg";
import {notReachable} from "../../utils/notReachable";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};

export const ScoresTableResultsPerDay = (props: Props) => {
  const [selectedGameDay, setSelectedGameDay] = useState(props.currentGameDay);

  const handleGameDayChange = (event: any) => {
    setSelectedGameDay(event.target.value as GameDay);
  };

  const isSmallScreen = useMediaQuery("(max-width: 650px)");

  // Записываем массив с gameDays без повторов
  const gameDays = Array.from(
    new Set(props.matches.map((match) => match.gameDay)),
  );

  const filteredMatchesByGameDay = props.matches.filter(
    (match) => match.gameDay === selectedGameDay,
  );

  const matchesData = filteredMatchesByGameDay.map((match) => {
    const matchPredictions = props.predictions.filter(
      (prediction) => prediction.matchId === match.id,
    );

    const matchResult = props.results.find(
      (result) => result.matchId === match.id,
    );

    const hostTeam = props.countries.find(
      (country) => country.id === match.hostId,
    );

    const guestTeam = props.countries.find(
      (country) => country.id === match.guestId,
    );

    if (!hostTeam || !guestTeam) {
      throw new Error("Должна быть гостевая или хозяйская команда");
    }

    return {
      match,
      hostTeam,
      guestTeam,
      matchPredictions,
      matchResult,
    };
  });

  const predictionsByUsers = props.users.map((user) => {
    const userPredictions = matchesData.map((matchData) => {
      const prediction = matchData.matchPredictions.find(
        (prediction) => prediction.userId === user.id,
      );

      //Если НЕТ предикшена или предикшн на матче еще не закрыт (Мы не можем светить предикшены ,если матч не закрыт!)
      if (!prediction || !matchData.match.isClosedForPrediction) {
        return null;
      }

      const predictionResult = matchData.matchResult
        ? calculatePredictionResult({
            prediction,
            result: matchData.matchResult,
          })
        : null;

      const score = predictionResult
        ? calculatePredictionResultScore({ predictionResult })
        : 0;

      return {
        prediction,
        predictionResult,
        score,
      };
    });
    return {
      userName: `${user.name} ${user.lastName}`,
      isAi: user.isAI,
      predictions: userPredictions,
    };
  });

  // Сортируем, чтобы AI был в конце списка, чтобы его потом выделить цветом в таблице.
  const sortedPredictionsByUsers = predictionsByUsers.sort(
    (a, b) => Number(a.isAi) - Number(b.isAi),
  );

  return (
    <>
      <FormControl
        variant="outlined"
        style={{ minWidth: 200, marginBottom: 20 }}
      >
        <InputLabel id="game-day-select-label">
          Выберите игровой день
        </InputLabel>
        <Select
          labelId="game-day-select-label"
          id="game-day-select"
          value={selectedGameDay}
          onChange={handleGameDayChange}
          label="Выберите игровой день"
        >
          {gameDays.map((gameDay) => (
            <MenuItem key={gameDay} value={gameDay}>
              Игровой день {gameDay}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <TableContainer
          component={Paper}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    paddingLeft: "15px",
                    fontSize: "0.775rem",
                    fontWeight: "bold",
                    color: CUSTOM_COLORS.headerFooter,
                  }}
                >
                  {isSmallScreen ? "" : "Эксперт"}
                </TableCell>
                {matchesData.map((item, index) => {
                  if (item !== null) {
                    return (
                      <TableCell
                        key={index}
                        align="center"
                        style={TABLE_CELL_STYLE}
                      >
                        {isSmallScreen ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <span>{item.hostTeam.nameRus}</span>
                            <span>-</span>
                            <span>{item.guestTeam.nameRus}</span>
                            {item.matchResult && (
                              <span>{`(${item.matchResult.hostScore}:${item.matchResult.guestScore})`}</span>
                            )}
                          </div>
                        ) : (
                          <div>
                            {item.hostTeam.nameRus} - {item.guestTeam.nameRus}
                            {item.matchResult &&
                              ` (${item.matchResult.hostScore}:${item.matchResult.guestScore})`}
                          </div>
                        )}
                      </TableCell>
                    );
                  }

                  return null;
                })}
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  {isSmallScreen ? "О" : "Очки"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPredictionsByUsers.map((userPredictionsData, index) => {
                let totalScore = 0;
                const isLastRow = index === sortedPredictionsByUsers.length - 1;

                return (
                  <TableRow
                    key={index}
                    style={{
                      backgroundColor: isLastRow
                        ? CUSTOM_COLORS.grey
                        : "inherit",
                    }}
                  >
                    <TableCell>{userPredictionsData.userName}</TableCell>
                    {userPredictionsData.predictions.map(
                      (predictionData, index) => {
                        if (predictionData) {
                          totalScore += predictionData.score;

                          return (
                            <TableCell
                              key={index}
                              align="center"
                              style={{
                                backgroundColor: predictionData.predictionResult
                                  ? getColorByPredictionResult(
                                      predictionData.predictionResult,
                                    )
                                  : "inherit",
                              }}
                            >
                              {predictionData.prediction.hostScore}:
                              {predictionData.prediction.guestScore}
                              {predictionData.prediction.isPari
                                ? " (ПАРИ)"
                                : ""}
                              {(() => {
                                switch (predictionData.prediction.type){
                                  case "group":
                                    return null
                                  case "play_off":
                                    switch (predictionData.prediction.extra){
                                      case "no_extra":
                                        return null
                                      case "host_extra":
                                        return " (ДОП.ХОЗ)"
                                      case "guest_extra":
                                        return " (ДОП.ГОСТИ)"
                                      case "host_penalty":
                                        return " (ПЕН.ХОЗ)"
                                      case "guest_penalty":
                                        return " (ПЕН.ГОСТИ)"
                                      default:
                                        return null
                                    }
                                  default:
                                    return notReachable(predictionData.prediction)
                                }
                              })()}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={index} align="center">
                            -
                          </TableCell>
                        );
                      },
                    )}
                    <TableCell align="center">{totalScore}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
