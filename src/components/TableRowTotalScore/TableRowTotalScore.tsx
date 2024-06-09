import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { TableCellNameAvatar } from "../TableCellNameAvatar/TableCellNameAvatar";
import { TableCellChangedPlace } from "../TableCellChangedPlace/TableCellChangedPlace";

type RowProps = {
  user: any;
  index: number;
  getCountryFlagUrl: any;
  usersWIthTotalScoreByPreviousGameDay: any[];
};

export const TableRowTotalScore = ({
  user,
  index,
  getCountryFlagUrl,
  usersWIthTotalScoreByPreviousGameDay,
}: RowProps) => {
  const [open, setOpen] = useState(false);

  const userPositionPreviousGameDay =
    usersWIthTotalScoreByPreviousGameDay.findIndex(
      (item) => item.userId === user.user.id,
    );

  return (
    <>
      <TableRow>
        <TableCell align="center" style={{ padding: "4px", width: "5%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center" style={{ padding: "4px", width: "10%" }}>
          {index + 1}
        </TableCell>
        <TableCellChangedPlace
          userPositionPreviousGameDay={userPositionPreviousGameDay}
          index={index}
        />
        <TableCellNameAvatar
          name={user.user.name}
          isWinner={user.user.isWinner}
          avatar={user.user.avatar}
          winnerCount={user.user.winnerCount}
        />
        <TableCell align="center" style={{ width: "25%" }}>
          {user.user.totalScore}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle2" gutterBottom component="div">
                Очки за групповой этап:
                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                  {user.user.userGroupScore}
                </span>
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                Очки за Пари:
                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                  {user.user.pariPointsScore}
                </span>
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                Точно угаданных результатов:
                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                  {user.user.exactScoresNumber}
                </span>
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                Прогноз на победителя:{" "}
                <img
                  style={{ marginLeft: "15px" }}
                  width={30}
                  height={30}
                  alt="United States"
                  src={getCountryFlagUrl(user.user.winnerPrediction)}
                />
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
