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
} from "@mui/material";
import { Country } from "../../domains/Country";
import { Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { User } from "../../domains/User";
import { getCountryFlagUrl } from "../../domains/Country/helpers/getCountryFlagUrl";
import { gradientBackground, shimmer } from "../../styles/gradients";
import StarIcon from "@mui/icons-material/Star";
import { CUSTOM_COLORS } from "../../styles/colors";

type Props = {
  matches: Match[];
  countries: Country[];
  predictions: Prediction[];
  users: User[];
};

export const CurrentMatchCard = (props: Props) => {
  const filteredMatchesByClosedPredictions = props.matches.filter(
    (match) => match.isClosedForPrediction,
  );

  const currentMatch = filteredMatchesByClosedPredictions.length
    ? filteredMatchesByClosedPredictions[
        filteredMatchesByClosedPredictions.length - 1
      ]
    : props.matches[0];

  const hostTeam = props.countries.find(
    (country) => country.id === currentMatch.hostId,
  );

  const guestTeam = props.countries.find(
    (country) => country.id === currentMatch.guestId,
  );

  const currentMatchPredictions = props.predictions.filter(
    (prediction) => prediction.matchId === currentMatch.id,
  );

  if (!hostTeam || !guestTeam) {
    return null;
  }

  return (
    <Card
      sx={{
        borderRadius: "10px",
        backgroundColor: CUSTOM_COLORS.lightGrey,
        minHeight: "300px",
        ...(currentMatch.isDoublePoints && {
          animation: `${gradientBackground} 4s infinite alternate`,
          backgroundSize: "200% 200%",
        }),
      }}
    >
      <CardContent>
        {currentMatch.isDoublePoints && (
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
              variant="h5"
              component="div"
              style={{ fontWeight: "bold" }}
            >
              {hostTeam.nameRus}
            </Typography>
          </Grid>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ margin: "0 16px" }}
          >
            &mdash;
          </Typography>
          <Grid item container direction="column" alignItems="center" xs>
            <Avatar
              alt={guestTeam.nameRus}
              src={getCountryFlagUrl(guestTeam.code)}
              style={{ marginBottom: "8px" }}
            />
            <Typography
              gutterBottom
              variant="h5"
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
              {currentMatchPredictions.map((prediction) => {
                const user = props.users.find(
                  (user) => user.id === prediction.userId,
                );

                if (!user) {
                  return null;
                }

                return (
                  <TableRow>
                    <TableCell style={{ width: "30%", textAlign: "center" }}>
                      {user.name + " " + user.lastName}
                    </TableCell>
                    <TableCell style={{ width: "70%", textAlign: "center" }}>
                      {prediction.hostScore} : {prediction.guestScore}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
