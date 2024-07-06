import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Paper,
  TableBody,
  Box,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Country } from "../../domains/Country";
import { Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { User } from "../../domains/User";
import { getCountryFlagUrl } from "../../domains/Country/helpers/getCountryFlagUrl";
import { gradientBackground, shimmer } from "../../styles/gradients";
import StarIcon from "@mui/icons-material/Star";
import { CUSTOM_COLORS } from "../../styles/colors";
import { Result } from "../../domains/Result";
import { calculatePredictionPercentages } from "../../hooks/useCalculatePredictionPercentages";
import { notReachable } from "../../utils/notReachable";

type Props = {
  matches: Match[];
  countries: Country[];
  predictions: Prediction[];
  users: User[];
  results: Result[];
  currentMatch: Match;
};

export const CurrentMatchCard = (props: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 650px)");

  const currentMatchResult = props.results.find(
    (result) => result.matchId === props.currentMatch.id,
  );

  const hostTeam = props.countries.find(
    (country) => country.id === props.currentMatch.hostId,
  );

  const guestTeam = props.countries.find(
    (country) => country.id === props.currentMatch.guestId,
  );

  const currentMatchPredictions = props.predictions.filter(
    (prediction) => prediction.matchId === props.currentMatch.id,
  );

  const sortedCurrentMatchPredictions = currentMatchPredictions.sort(
    (a, b) => Number(b.userId) - Number(a.userId),
  );

  if (!hostTeam || !guestTeam) {
    return null;
  }

  //Считаем проценты на победителя по предикшенам без AI на currentMatch

  const currentMatchPercentagesWithoutAi = calculatePredictionPercentages(
    sortedCurrentMatchPredictions,
  );

  //Описываем логику стилей прогресс бара

  const ProgressBarContainer = styled("div")({
    display: "flex",
    height: "30px",
    width: "100%",
    backgroundColor: theme.palette.grey[300],
    borderRadius: "5px",
    overflow: "hidden",
  });

  const ProgressBarSegment = styled("div")<{
    color: string;
    width: number;
  }>(({ color, width }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color,
    width: width > 0 ? `${width}%` : "6%",
    position: "relative",
    color: "#fff",
    fontWeight: "bold",
  }));

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "10px",
        backgroundColor: CUSTOM_COLORS.lightGrey,
        minHeight: "300px",
        ...(props.currentMatch.isDoublePoints && {
          animation: `${gradientBackground} 4s infinite alternate`,
          backgroundSize: "200% 200%",
        }),
      }}
    >
      <CardContent>
        {props.currentMatch.isDoublePoints && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "gold",
              animation: `${shimmer} 0.5s infinite`,
            }}
          >
            <StarIcon />
          </Box>
        )}
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ margin: "16px 0" }}
        >
          <Grid item container direction="column" alignItems="center" xs>
            <Avatar
              alt={hostTeam.nameRus}
              src={getCountryFlagUrl(hostTeam.code)}
              style={{ marginBottom: "8px" }}
            />
            <Typography
              gutterBottom
              variant={isSmallScreen ? "h6" : "h5"}
              component="div"
              style={{ fontWeight: "bold" }}
            >
              {hostTeam.nameRus}
            </Typography>
          </Grid>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            style={{ margin: "0 16px" }}
          >
            {currentMatchResult
              ? `${currentMatchResult.hostScore} - ${currentMatchResult.guestScore}`
              : `-`}
          </Typography>
          <Grid item container direction="column" alignItems="center" xs>
            <Avatar
              alt={guestTeam.nameRus}
              src={getCountryFlagUrl(guestTeam.code)}
              style={{ marginBottom: "8px" }}
            />
            <Typography
              gutterBottom
              variant={isSmallScreen ? "h6" : "h5"}
              component="div"
              style={{ fontWeight: "bold" }}
            >
              {guestTeam.nameRus}
            </Typography>
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          square
          elevation={3}
          style={{ margin: "0 auto", borderRadius: "10px" }}
        >
          <Table size="small" aria-label="simple table">
            <TableBody>
              {sortedCurrentMatchPredictions.map((prediction, index) => {
                const user = props.users.find(
                  (user) => user.id === prediction.userId,
                );

                if (!user) {
                  return null;
                }

                //Проверяем предикшн осьминога (он всегда последний в списке) и рисуем ему цвет от его предикшена,
                // относительно цветов, которые заданы в прогрессБаре предикшенов

                const isLastRow =
                  index === sortedCurrentMatchPredictions.length - 1;

                let lastRowColor = CUSTOM_COLORS.grey;
                if (isLastRow) {
                  if (prediction.hostScore > prediction.guestScore) {
                    lastRowColor = CUSTOM_COLORS.lightBlue;
                  } else if (prediction.hostScore === prediction.guestScore) {
                    lastRowColor = CUSTOM_COLORS.purple;
                  } else if (prediction.hostScore < prediction.guestScore) {
                    lastRowColor = CUSTOM_COLORS.lightPink;
                  }
                }

                return (
                  <TableRow
                    key={user.id}
                    style={{
                      backgroundColor: isLastRow ? lastRowColor : "inherit",
                    }}
                  >
                    <TableCell style={{ width: "30%", textAlign: "left" }}>
                      {user.name + " " + user.lastName}
                    </TableCell>
                    <TableCell style={{ width: "70%", textAlign: "center" }}>
                      {prediction.hostScore} : {prediction.guestScore}{" "}
                      {prediction.isPari ? " (ПАРИ)" : ""}
                      {(() => {
                        switch (prediction.type) {
                          case "group":
                            return null;
                          case "play_off":
                            switch (prediction.extra) {
                              case "no_extra":
                                return null;
                              case "host_extra":
                                return " (ДОП.ХОЗ)";
                              case "guest_extra":
                                return " (ДОП.ГОСТИ)";
                              case "host_penalty":
                                return " (ПЕН.ХОЗ)";
                              case "guest_penalty":
                                return " (ПЕН.ГОСТИ)";
                              default:
                                return null;
                            }
                          default:
                            return notReachable(prediction);
                        }
                      })()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Box sx={{ width: "100%", p: 2, padding: "0" }}>
        <Typography variant="h6" align="center">
          Предположения экспертов
        </Typography>
        <ProgressBarContainer>
          <ProgressBarSegment
            color={CUSTOM_COLORS.lightBlue}
            width={currentMatchPercentagesWithoutAi.hostWinPercentage}
          >
            {currentMatchPercentagesWithoutAi.hostWinPercentage > 0
              ? currentMatchPercentagesWithoutAi.hostWins
              : 0}
          </ProgressBarSegment>
          <ProgressBarSegment
            color={CUSTOM_COLORS.purple}
            width={currentMatchPercentagesWithoutAi.drawPercentage}
          >
            {currentMatchPercentagesWithoutAi.drawPercentage > 0
              ? currentMatchPercentagesWithoutAi.draw
              : 0}
          </ProgressBarSegment>
          <ProgressBarSegment
            color={CUSTOM_COLORS.lightPink}
            width={currentMatchPercentagesWithoutAi.guestWinPercentage}
          >
            {currentMatchPercentagesWithoutAi.guestWinPercentage > 0
              ? currentMatchPercentagesWithoutAi.guestWins
              : 0}
          </ProgressBarSegment>
        </ProgressBarContainer>
      </Box>
    </Card>
  );
};
