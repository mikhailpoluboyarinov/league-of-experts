import { Box, Grid, Typography } from "@mui/material";
import { CurrentMatchCard } from "../CurrentMatchCard/CurrentMatchCard";
import { Country } from "../../domains/Country";
import { GameDay, Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";
import { useUpcomingMatchesAfterClosedForPrediction } from "../../hooks/useUpcomingMatchesAfterClosedForPrediction";
import { UpcomingMatchCard } from "../UpcomingMatchCard/UpcomingMatchCard";
import { LastMatchCard } from "../LastMatchCard/LastMatchCard";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const MatchCardsContainer = (props: Props) => {
  // Фильтруем матчи по закрытым предсказаниям
  const filteredMatchesByClosedPredictions = props.matches.filter(
    (match) => match.isClosedForPrediction,
  );

  // Узнаем какой текущий матч
  const currentMatch = filteredMatchesByClosedPredictions.length
    ? filteredMatchesByClosedPredictions[
        filteredMatchesByClosedPredictions.length - 1
      ]
    : props.matches[0];

  //Проверяем два матча последних в закрытыми предсказаниям, если одинаковое стартовое время, то будет рисовать две карточки

  const currentMatches =
    filteredMatchesByClosedPredictions.length >= 2 &&
    filteredMatchesByClosedPredictions[
      filteredMatchesByClosedPredictions.length - 1
    ].startTime ===
      filteredMatchesByClosedPredictions[
        filteredMatchesByClosedPredictions.length - 2
      ].startTime
      ? {
          lastMatch:
            filteredMatchesByClosedPredictions[
              filteredMatchesByClosedPredictions.length - 1
            ],
          secondLastMatch:
            filteredMatchesByClosedPredictions[
              filteredMatchesByClosedPredictions.length - 2
            ],
        }
      : null;

  // Записываем отфильтрованные матчи по закрытому предсказыванию в константу
  const filteredUpcomingMatches = useUpcomingMatchesAfterClosedForPrediction(
    props.matches,
  );

  // Получение первых двух матчей из отфильтрованного списка для отрисовки
  const twoMatchesToRender = filteredUpcomingMatches.slice(0, 2);

  return (
    <Grid
      container
      spacing={2}
      style={{ paddingTop: "40px", paddingBottom: "40px" }}
    >
      {currentMatches ? (
        <>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5" style={{ paddingBottom: "10px" }}>
              Текущие матчи:
            </Typography>

            <Box mb={2}>
              <CurrentMatchCard
                currentMatch={currentMatches.lastMatch}
                results={props.results}
                matches={props.matches}
                countries={props.countries}
                predictions={props.predictions}
                users={props.users}
              />
            </Box>
            <CurrentMatchCard
              currentMatch={currentMatches.secondLastMatch}
              results={props.results}
              matches={props.matches}
              countries={props.countries}
              predictions={props.predictions}
              users={props.users}
            />
          </Grid>
        </>
      ) : (
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h5" style={{ paddingBottom: "10px" }}>
            Текущий матч
          </Typography>
          <CurrentMatchCard
            currentMatch={currentMatch}
            results={props.results}
            matches={props.matches}
            countries={props.countries}
            predictions={props.predictions}
            users={props.users}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h5" style={{ paddingBottom: "10px" }}>
          Ближайшие матчи
        </Typography>
        <Grid container direction="column" spacing={2}>
          {twoMatchesToRender.length !== 0 ? (
            twoMatchesToRender.map((match, index) => (
              <Grid key={index} item>
                <UpcomingMatchCard
                  hostTeamId={match.hostId}
                  guestTeamId={match.guestId}
                  description={match.description}
                  isDoublePoints={match.isDoublePoints}
                  countries={props.countries}
                  startTime={match.startTime}
                />
              </Grid>
            ))
          ) : (
            <Grid item>
              <LastMatchCard />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
