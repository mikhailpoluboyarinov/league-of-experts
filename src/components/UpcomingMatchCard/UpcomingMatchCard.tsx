import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface UpcomingMatchCard {
  hostTeam: any;
  guestTeam: any;
}

export const UpcomingMatchCard: FC<UpcomingMatchCard> = ({
  hostTeam,
  guestTeam,
}) => {
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
                США
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
                Великобритания
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
            Здравствуйте, уважаемые любители футбола! В матче второго тура
            группового этапа Чемпионата мира-2022 в группе B сборная Англии
            встретится с командой США. Англичане в первом матче на турнире
            разгромили сборную Ирана со счетом 6:2. А американцы сыграли вничью
            с Уэльсом. Последний раз друг с другом команды встречались в
            товарищеском матче в 2018 году и тогда сборная Англии победила со
            счетом 3:0. На групповом этапе на Чемпионате мира-2010 года в ЮАР
            так же играли друг с другом и тогда сыграли вничью 1:1 и тогда обе
            команды пробились в плей-офф. Новая встреча команд состоится 25
            ноября в 22:00 по московскому времени.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
