import { Grid, Typography } from "@mui/material";
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
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h5" style={{ paddingBottom: "10px" }}>
          Текущий матч
        </Typography>
        <CurrentMatchCard
          results={props.results}
          matches={props.matches}
          countries={props.countries}
          predictions={props.predictions}
          users={props.users}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h5" style={{ paddingBottom: "10px" }}>
          Ближайшие матчи
        </Typography>
        <Grid container direction="column" spacing={2}>
          {twoMatchesToRender.length !== 0 ? (
            twoMatchesToRender.map((match) => (
              <Grid item>
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
