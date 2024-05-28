import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export const UpcomingMatchCard = ({
  hostTeam,
  guestTeam,
  description,
  isDoublePoints,
}: any) => {
  return (
    <Card
      style={{
        borderRadius: "10px",
        backgroundColor: "#fafdc4",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ margin: "16px 0" }}
          >
            <Grid item container direction="column" alignItems="center" xs>
              <Avatar
                alt={hostTeam.toString()}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${hostTeam}.svg`}
                style={{ marginBottom: "8px" }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                {hostTeam}
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
                alt={guestTeam.toString()}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${guestTeam}.svg`}
                style={{ marginBottom: "8px" }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                {guestTeam}
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
            }}
          >
            {description || "Здесь скоро появится анонс матча."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
