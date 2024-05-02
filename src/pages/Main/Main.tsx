import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import { ScoresTableTotalPage } from "../ScoresTableTotalPage/ScoresTableTotalPage";
import { ScoresTableGroupPage } from "../ScoresTableGroupPage/ScoresTableGroupPage";
import { ScoresTablePlayoffPage } from "../ScoresTablePlayoffPage/ScoresTablePlayoffPage";

export const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<ScoresTableTotalPage />} />
      <Route path="/group" element={<ScoresTableGroupPage />} />
      <Route path="/playoff" element={<ScoresTablePlayoffPage />} />
      <Route path="*" element={<Typography>Not found</Typography>} />
    </Routes>
  );
};
