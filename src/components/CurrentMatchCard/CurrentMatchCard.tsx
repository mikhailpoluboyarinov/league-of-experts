import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import { FC } from "react";

interface CurrentMatchCard {
  hostTeam: any;
  guestTeam: any;
  userPredictionsCurrentMatch: any;
}

export const CurrentMatchCard: FC<CurrentMatchCard> = ({
  hostTeam,
  guestTeam,
  userPredictionsCurrentMatch,
}) => {
  return (
    <Card
      style={{
        borderRadius: "10px",
        backgroundColor: "#f59fff",
        minHeight: "300px",
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
                alt={hostTeam}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${hostTeam}.svg`}
                style={{ marginBottom: "8px" }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                Германия
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
                alt={guestTeam}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${guestTeam}.svg`}
                style={{ marginBottom: "8px" }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                Франция
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
                {userPredictionsCurrentMatch.map((user: any) => {
                  return (
                    <TableRow>
                      <TableCell style={{ width: "30%", textAlign: "center" }}>
                        {user.userId}
                      </TableCell>
                      <TableCell style={{ width: "70%", textAlign: "center" }}>
                        {"Германия "}
                        {user.hostScore} : {user.guestScore} {"Франция"}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%", textAlign: "center" }}>
                    {"123123123"}
                  </TableCell>
                  <TableCell style={{ width: "70%", textAlign: "center" }}>
                    {"Германия "}
                    {"2"} : {"3"} {"Франция"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
