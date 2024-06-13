import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { getCountryFlagUrl } from "../../domains/Country/helpers/getCountryFlagUrl";
import { Country, CountryId } from "../../domains/Country";
import { gradientBackground, shimmer } from "../../styles/gradients";

type UpcomingMatchCardProps = {
  hostTeamId: CountryId;
  guestTeamId: CountryId;
  description: string;
  isDoublePoints: boolean;
  countries: Country[];
};

export const UpcomingMatchCard = ({
  hostTeamId,
  guestTeamId,
  description,
  isDoublePoints,
  countries,
}: UpcomingMatchCardProps) => {
  const hostTeam = countries.find((country) => country.id === hostTeamId);

  const guestTeam = countries.find((country) => country.id === guestTeamId);

  if (!hostTeam || !guestTeam) {
    return null;
  }

  return (
    <Card
      sx={{
        borderRadius: "10px",
        background: "#fafdc4",
        ...(isDoublePoints && {
          animation: `${gradientBackground} 4s infinite alternate`,
          backgroundSize: "200% 200%",
        }),
      }}
    >
      <CardContent>
        {isDoublePoints && (
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
              alt="123"
              src={getCountryFlagUrl(hostTeam.code)}
              style={{ marginBottom: "8px" }}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                fontWeight: "bold",
              }}
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
              alt={"asd"}
              src={getCountryFlagUrl(guestTeam.code)}
              style={{ marginBottom: "8px" }}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                fontWeight: "bold",
              }}
            >
              {guestTeam.nameRus}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
            minHeight: "180px",
            textAlign: "center",
          }}
        >
          {description || "Здесь скоро появится анонс матча."}
        </Typography>
      </CardContent>
    </Card>
  );
};
