import { Grid, Typography } from "@mui/material";
import { CurrentMatchCard } from "../CurrentMatchCard/CurrentMatchCard";
import { Country } from "../../domains/Country";
import { GameDay, Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";
import { UsersResultsPerDayCard } from "../UsersResultsPerDayCard/UsersResultsPerDayCard";
import { useUpcomingMatchesAfterClosedForPrediction } from "../../hooks/useUpcomingMatchesAfterClosedForPrediction";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};
export const MatchCardsContainer = (props: Props) => {
  const currentMatch = props.matches.find((match) => match.gameDay === 1);
  const upcomingMatch = props.matches.find((match) => match.gameDay === 3);

  let userPredictionsCurrentMatch: Prediction[] = [];
  if (currentMatch) {
    userPredictionsCurrentMatch = props.predictions.filter(
      (prediction) => prediction.matchId === currentMatch.id,
    );
  }

  const currentMatchCard = currentMatch
    ? {
        hostTeam: currentMatch.hostId,
        guestTeam: currentMatch.guestId,
      }
    : {
        hostTeam: "",
        guestTeam: "",
      };

  const upcomingMatchCard = upcomingMatch
    ? {
        hostTeam: upcomingMatch.hostId,
        guestTeam: upcomingMatch.guestId,
      }
    : {
        hostTeam: "",
        guestTeam: "",
      };

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
<<<<<<< HEAD
          {twoMatchesToRender.map((match) => (
            <Grid item>
              <UpcomingMatchCard
                hostTeam={match.hostId}
                guestTeam={match.guestId}
                description={match.description}
                isDoublePoints={match.isDoublePoints}
              />
            </Grid>
          ))}
=======
          <Grid item>
            <UpcomingMatchCard
              matches={props.matches}
              countries={props.countries}
              predictions={props.predictions}
              users={props.users}
            />
          </Grid>
          <Grid item>
            <UpcomingMatchCard
              matches={props.matches}
              countries={props.countries}
              predictions={props.predictions}
              users={props.users}
            />
          </Grid>
>>>>>>> 841c706 (add logic for currentMatchCard)
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h5" style={{ paddingBottom: "10px" }}>
          Результаты игроков за день
        </Typography>
        <UsersResultsPerDayCard
          hostTeam={currentMatchCard.hostTeam}
          guestTeam={currentMatchCard.guestTeam}
          userPredictionsCurrentMatch={userPredictionsCurrentMatch}
        />
      </Grid>
    </Grid>
  );
};
