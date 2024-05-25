import { Routes, Route } from "react-router-dom";
import { ScoresTableTotalPage } from "../ScoresTableTotalPage/ScoresTableTotalPage";
import { ScoresTableGroupPage } from "../ScoresTableGroupPage/ScoresTableGroupPage";
import { ScoresTablePlayoffPage } from "../ScoresTablePlayoffPage/ScoresTablePlayoffPage";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { GameRulesPage } from "../GameRulesPage/GameRulesPage";
import { LoginAdmin } from "../../components/LoginAdmin/LoginAdmin";
import { MatchesPage } from "../MatchesPage/MatchesPage";
import { CountriesPage } from "../CountriesPage/CountriesPage";
import { PredictionsPage } from "../PredictionsPage/PredictionsPage";
import { MiscPage } from "../MiscPage/MiscPage";
import { AdminLayoutPage } from "../AdminLayoutPage/AdminLayoutPage";
import { ResultsPage } from "../ResultsPage/ResultsPage";
import { UsersPage } from "../UsersPage/UsersPage";

export const Main = () => {
  const handleLogin = ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    console.log("login", login, password);
  };

  return (
    <Routes>
      <Route path="/" element={<ScoresTableTotalPage />} />
      <Route path="/group" element={<ScoresTableGroupPage />} />
      <Route path="/playoff" element={<ScoresTablePlayoffPage />} />
      <Route path="/faq" element={<GameRulesPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/login/admin"
        element={<LoginAdmin onLogin={handleLogin} />}
      />
      <Route path="/admin" element={<AdminLayoutPage />}>
        <Route path="countries" element={<CountriesPage />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="misc" element={<MiscPage />} />
        <Route path="predictions" element={<PredictionsPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
};
