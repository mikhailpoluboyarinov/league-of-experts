import { Routes, Route } from "react-router-dom";
import { ScoresTableTotalPage } from "../ScoresTableTotalPage/ScoresTableTotalPage";
import { ScoresTableGroupPage } from "../ScoresTableGroupPage/ScoresTableGroupPage";
import { ScoresTablePlayoffPage } from "../ScoresTablePlayoffPage/ScoresTablePlayoffPage";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { GameRulesPage } from "../GameRulesPage/GameRulesPage";
import { ScoresTableResultsPerDayPage } from "../ScoresTableResultsPerDayPage/ScoresTableResultsPerDayPage";

export const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<ScoresTableTotalPage />} />
      <Route path="/group" element={<ScoresTableGroupPage />} />
      <Route path="/playoff" element={<ScoresTablePlayoffPage />} />
      <Route
        path="/results-per-day"
        element={<ScoresTableResultsPerDayPage />}
      />
      <Route path="/faq" element={<GameRulesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
