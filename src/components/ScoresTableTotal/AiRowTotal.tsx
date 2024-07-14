import React, { useState } from "react";

import {
  TableRow,
  TableCell,
  useMediaQuery,
  Typography,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import { TableCellNameAvatar } from "../TableCellNameAvatar/TableCellNameAvatar";
import { getCountryFlagUrlById } from "../../domains/Country/helpers/getCountryFlagUrlById";
import {
  AiWithScoresTotal,
  useAiWithScoresTotal,
} from "../../hooks/useAiWithScoresTotal";
import { GameDay, Match } from "../../domains/Match";
import { Country } from "../../domains/Country";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { CUSTOM_COLORS } from "../../styles/colors";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
  currentGameDay: GameDay;
};

export const AiRowTotal = (props: Props) => {
  const aiWithScore = useAiWithScoresTotal({
    matches: props.matches,
    results: props.results,
    users: props.users,
    predictions: props.predictions,
  });

  const isSmallScreen = useMediaQuery("(max-width: 650px)");

  return isSmallScreen ? (
    <RowAi countries={props.countries} data={aiWithScore} />
  ) : (
    <>
      <TableRow key={aiWithScore.id + 2}>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        {/*<TableCell />*/}
        <TableCell />
      </TableRow>
      <TableRow
        key={aiWithScore.id}
        style={{ backgroundColor: CUSTOM_COLORS.grey }}
      >
        <TableCell align="center" style={{ padding: "4px", width: "5%" }}>
          -
        </TableCell>
        <TableCell style={{ width: "3%" }} />
        <TableCellNameAvatar
          id={aiWithScore.id}
          name={aiWithScore.name}
          isWinner={aiWithScore.isWinner}
          avatar={aiWithScore.avatar}
          winnerCount={aiWithScore.winnerCount}
        />
        <TableCell align="center" style={{ width: "8%" }}>
          <img
            width={30}
            height={30}
            alt="United States"
            src={getCountryFlagUrlById(
              props.countries,
              aiWithScore.winnerPrediction,
            )}
          />
        </TableCell>
        <TableCell align="center" style={{ width: "8%" }}>
          {aiWithScore.exactScoresNumber}
        </TableCell>
        <TableCell align="center" style={{ width: "8%" }}>
          {aiWithScore.groupScore}
        </TableCell>
        {aiWithScore.scoresByPlayOffGameDays.map((score, index) => {
          return (
            <TableCell
              key={index}
              align="center"
              style={{
                width: "4%",
              }}
            >
              {score}
            </TableCell>
          );
        })}
        {/*
        <TableCell align="center" style={{ width: "5%" }}>
          {aiWithScore.pariScoresTotal}
        </TableCell>
        */}
        <TableCell align="center" style={{ width: "7%", color: CUSTOM_COLORS.orange }}>
          {aiWithScore.winnerPointsScore}
        </TableCell>
        <TableCell align="center" style={{ width: "7%" }}>
          {aiWithScore.totalScore}
        </TableCell>
      </TableRow>
    </>
  );
};

export const RowAi = ({
  countries,
  data,
}: {
  countries: Country[];
  data: AiWithScoresTotal;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell style={{ padding: "2px" }} />
        <TableCell style={{ padding: "2px" }} />
        <TableCell style={{ padding: "2px" }} />
        <TableCell style={{ padding: "2px" }} />
        <TableCell style={{ padding: "2px" }} />
      </TableRow>
      <TableRow style={{ backgroundColor: CUSTOM_COLORS.grey }}>
        <TableCell align="center" style={{ padding: "4px", width: "5%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center" style={{ padding: "4px", width: "5%" }}>
          -
        </TableCell>
        <TableCell align="center" style={{ padding: "4px", width: "10%" }} />
        <TableCellNameAvatar
          id={data.id}
          name={data.name}
          isWinner={data.isWinner}
          avatar={data.avatar}
          winnerCount={data.winnerCount}
        />
        <TableCell align="center" style={{ padding: "4px", width: "25%" }}>
          {data.totalScore}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle2" gutterBottom component="div">
                Очки за групповой этап:
                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                  {data.groupScore}
                </span>
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                Пари:
                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                  {data.pariScoresTotal}
                </span>
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                Нагретые шары:
                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                  {data.hotBallPointsScore}
                </span>
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                Точно угаданных результатов:
                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                  {data.exactScoresNumber}
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
                  src={getCountryFlagUrlById(countries, data.winnerPrediction)}
                />
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
