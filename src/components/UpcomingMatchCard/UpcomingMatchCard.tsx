import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { getCountryFlagUrl } from "../../domains/Country/helpers/getCountryFlagUrl";
import { Country, CountryId } from "../../domains/Country";
import { gradientBackground, shimmer } from "../../styles/gradients";
import Markdown from "react-markdown";
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { TimeStamp } from "../../domains/Date";
import { calculateMatchCountdownTimer } from "../../domains/Match/components/calculateMatchCountdownTimer";
import { useEffect, useState } from "react";

type UpcomingMatchCardProps = {
  hostTeamId: CountryId;
  guestTeamId: CountryId;
  description: string;
  isDoublePoints: boolean;
  countries: Country[];
  startTime: TimeStamp;
};

export const UpcomingMatchCard = ({
  hostTeamId,
  guestTeamId,
  description,
  isDoublePoints,
  countries,
  startTime,
}: UpcomingMatchCardProps) => {
  const [matchTimer, setMatchTimer] = useState<string | null>(null);

  useEffect(() => {
    const updateMatchTimer = () => {
      const countdown = calculateMatchCountdownTimer(startTime);
      setMatchTimer(countdown);
    };

    // Устанавливаем интервал для обновления таймера каждую секунду
    const interval = setInterval(updateMatchTimer, 1000);

    // Первоначальное обновление таймера сразу после рендера компонента
    updateMatchTimer();

    // Очищаем интервал
    return () => clearInterval(interval);
  }, [startTime]);

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const hostTeam = countries.find((country) => country.id === hostTeamId);

  const guestTeam = countries.find((country) => country.id === guestTeamId);

  if (!hostTeam || !guestTeam) {
    return null;
  }

  const formattedDescription = description
    ? description.replace(/\n/g, "  \n")
    : "";

  return (
    <Card
      sx={{
        position: "relative",
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
        {isSmallScreen ? (
          <Typography gutterBottom variant="subtitle2">
            {matchTimer !== null ? (
              <div>{matchTimer}</div>
            ) : (
              <div>
                {formatRelative(new Date(startTime * 1000), new Date(), {
                  locale: ru,
                })}
              </div>
            )}
          </Typography>
        ) : (
          ""
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
          {isSmallScreen ? (
            <>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ margin: "0 16px" }}
              >
                &mdash;
              </Typography>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ margin: "0 16px" }}
              >
                {matchTimer !== null ? (
                  <div>{matchTimer}</div>
                ) : (
                  <div>
                    {formatRelative(new Date(startTime * 1000), new Date(), {
                      locale: ru,
                    })}
                  </div>
                )}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ margin: "0 16px" }}
              >
                &mdash;
              </Typography>
            </div>
          )}

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
            textAlign: description ? "left" : "center",
          }}
        >
          <Markdown>
            {formattedDescription || "Здесь скоро появится анонс матча."}
          </Markdown>
        </Typography>
      </CardContent>
    </Card>
  );
};
