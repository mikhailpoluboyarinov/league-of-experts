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
import { keyframes } from "@mui/system";

export const UpcomingMatchCard = ({
  hostTeam,
  guestTeam,
  description,
  isDoublePoints,
}: any) => {
  const shimmer = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  `;

  const gradientText = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  return (
    <Card
      style={{
        borderRadius: "10px",
        backgroundColor: "#fafdc4",
      }}
    >
      <CardActionArea>
        <CardContent>
          {!isDoublePoints && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "gold",
                animation: `${shimmer} 1.5s infinite`,
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
                alt={hostTeam.toString()}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${hostTeam}.svg`}
                style={{ marginBottom: "8px" }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  fontWeight: "bold",
                  ...(!isDoublePoints && {
                    background:
                      "linear-gradient(270deg, #34e89e, #0f3443, #f7971e, #ff512f)",
                    backgroundSize: "200% 200%",
                    animation: `${gradientText} 8s ease infinite`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }),
                }}
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
                style={{
                  fontWeight: "bold",
                  ...(!isDoublePoints && {
                    background:
                      "linear-gradient(270deg, #34e89e, #0f3443, #f7971e, #ff512f)",
                    backgroundSize: "200% 200%",
                    animation: `${gradientText} 8s ease infinite`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }),
                }}
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
