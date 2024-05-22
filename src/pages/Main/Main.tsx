import { Routes, Route } from "react-router-dom";
import { ScoresTableTotalPage } from "../ScoresTableTotalPage/ScoresTableTotalPage";
import { ScoresTableGroupPage } from "../ScoresTableGroupPage/ScoresTableGroupPage";
import { ScoresTablePlayoffPage } from "../ScoresTablePlayoffPage/ScoresTablePlayoffPage";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { GameRulesPage } from "../GameRulesPage/GameRulesPage";
import { LoginAdmin } from "../../components/LoginAdmin/LoginAdmin";

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
    </Routes>
  );
};
