import { Country } from "../../domains/Country";
import { GameDay, Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";
import {
  Paper,
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
import { PredictionResult } from "../../domains/GameRules";
import { notReachable } from "../../utils/notReachable";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};

export const ScoresTableResultsPerDay = (props: Props) => {
  const isMediumScreen = useMediaQuery(
    "(min-width: 651px) and (max-width: 1050px)",
  );

  const filteredMatchesByGameDay = props.matches.filter(
    (match) => match.gameDay === 4,
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

      return {
        prediction,
        predictionResult: matchData.matchResult
          ? calculatePredictionResult({
              prediction,
              result: matchData.matchResult,
            })
          : null,
      };
    });
    return {
      userName: user.name,
      predictions: userPredictions,
    };
  });

  const getBgColorByPredictionResult = (predictionResult: PredictionResult) => {
    switch (predictionResult.type) {
      case "group":
        switch (predictionResult.matchState.type) {
          case "fail":
            return "Red";
          case "exact_score":
            return "Green";
          case "exact_difference":
            return "Blue";
          case "match_outcome":
            return "Purple";
          default:
            return notReachable(predictionResult.matchState);
        }
      case "play_off":
        switch (predictionResult.matchState.type) {
          case "fail":
            return "Red";
          case "exact_score":
            return "Green";
          case "exact_difference":
            return "light-green";
          case "match_outcome":
            return "Purple";
          default:
            return notReachable(predictionResult.matchState);
        }
    }
  };

  console.log("Day2", matchesData);

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={TABLE_CELL_STYLE}>
                  {isMediumScreen ? "И" : "Имя"}
                </TableCell>
                {matchesData.map((item) => {
                  if (item !== null) {
                    return (
                      <TableCell align="center" style={TABLE_CELL_STYLE}>
                        {item.hostTeam.nameRus} - {item.guestTeam.nameRus}
                        {item.matchResult
                          ? `(${item.matchResult.hostScore}:${item.matchResult.guestScore})`
                          : null}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {predictionsByUsers.map((prediction) => (
                <TableRow>
                  <TableCell>{prediction.userName}</TableCell>
                  {prediction.predictions.map((predictionData) =>
                    predictionData ? (
                      <TableCell
                        align="center"
                        style={{
                          backgroundColor: predictionData.predictionResult
                            ? getBgColorByPredictionResult(
                                predictionData.predictionResult,
                              )
                            : "white",
                        }}
                      >
                        {predictionData.prediction.hostScore}:
                        {predictionData.prediction.guestScore}
                      </TableCell>
                    ) : (
                      <TableCell align="center">-</TableCell>
                    ),
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
