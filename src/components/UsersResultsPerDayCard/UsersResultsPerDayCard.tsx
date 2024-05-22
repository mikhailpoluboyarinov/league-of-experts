import {
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";

interface UsersResultsPerDayCard {
  hostTeam: any;
  guestTeam: any;
  userPredictionsCurrentMatch: any;
}

export const UsersResultsPerDayCard: FC<UsersResultsPerDayCard> = ({
  hostTeam,
  guestTeam,
  userPredictionsCurrentMatch,
}) => {
  return (
    <Card
      style={{
        borderRadius: "10px",
        backgroundColor: "#9cd5e5",
        minHeight: "300px",
      }}
    >
      <CardActionArea>
        <CardContent>
          <TableContainer
            component={Paper}
            square
            elevation={3}
            style={{ margin: "0 auto", borderRadius: "10px" }}
          >
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      padding: "3px",
                      width: "10%",
                      textAlign: "center",
                    }}
                  >
                    Имя
                  </TableCell>
                  <TableCell
                    style={{
                      padding: "3px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    <div>Германия</div>
                    <div>4 : 2</div>
                    <div>Франция</div>
                  </TableCell>
                  <TableCell
                    style={{
                      padding: "3px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    <div>Германия</div>
                    <div>4 : 2</div>
                    <div>Франция</div>
                  </TableCell>
                  <TableCell
                    style={{
                      padding: "3px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    <div>Германия</div>
                    <div>4 : 2</div>
                    <div>Франция</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userPredictionsCurrentMatch.map((user: any) => {
                  return (
                    <TableRow>
                      <TableCell
                        style={{
                          padding: "3px",
                          width: "10%",
                          textAlign: "center",
                        }}
                      >
                        {user.userId}
                      </TableCell>
                      <TableCell
                        style={{
                          padding: "3px",
                          width: "30%",
                          textAlign: "center",
                        }}
                      >
                        {user.hostScore} : {user.guestScore}
                      </TableCell>
                      <TableCell
                        style={{
                          padding: "3px",
                          width: "30%",
                          textAlign: "center",
                        }}
                      >
                        {user.hostScore} : {user.guestScore}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "25%",
                          textAlign: "center",
                          padding: "3px",
                        }}
                      >
                        {user.hostScore} : {user.guestScore}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
