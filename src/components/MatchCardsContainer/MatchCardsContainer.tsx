import { Grid, Typography } from "@mui/material";
import { CurrentMatchCard } from "../CurrentMatchCard/CurrentMatchCard";
import { Country } from "../../domains/Country";
import { GameDay, Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";
import { UpcomingMatchCard } from "../UpcomingMatchCard/UpcomingMatchCard";
import { UsersResultsPerDayCard } from "../UsersResultsPerDayCard/UsersResultsPerDayCard";

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
  console.log("currentMatch", currentMatch);

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
          hostTeam={currentMatchCard.hostTeam}
          guestTeam={currentMatchCard.guestTeam}
          userPredictionsCurrentMatch={userPredictionsCurrentMatch}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h5" style={{ paddingBottom: "10px" }}>
          Ближайшие матчи
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <UpcomingMatchCard
              hostTeam={upcomingMatchCard.hostTeam}
              guestTeam={upcomingMatchCard.guestTeam}
            />
          </Grid>
          <Grid item>
            <UpcomingMatchCard
              hostTeam={upcomingMatchCard.hostTeam}
              guestTeam={upcomingMatchCard.guestTeam}
            />
          </Grid>
          <Grid item>
            <UpcomingMatchCard
              hostTeam={upcomingMatchCard.hostTeam}
              guestTeam={upcomingMatchCard.guestTeam}
            />
          </Grid>
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
