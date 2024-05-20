import { useFetchMainData } from "../../hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { ScoresTablePlayoffStage } from "../../components/ScoresTablePlayoffStage/ScoresTablePlayoffStage";
import { Typography } from "@mui/material";
import { Header } from "../../components/Header/Header";
import { Layout } from "../../components/Layout/Layout";
import { Title } from "../../components/Title/Title";
import { Footer } from "../../components/Footer/Footer";

export const ScoresTablePlayoffPage = () => {
  const data = useFetchMainData();

  switch (data.type) {
    case "loading":
      return <Typography>Loading</Typography>;
    case "loaded":
      return (
        <>
          <Header />

          <Layout>
            <Title title="Таблица плей-офф" />
            <ScoresTablePlayoffStage
              countries={data.data.countries}
              matches={data.data.matches}
              predictions={data.data.predictions}
              results={data.data.results}
              users={data.data.users}
              currentGameDay={data.data.currentGameDay}
            />
          </Layout>

          <Footer />
        </>
      );
    case "error":
      return <Typography>Error</Typography>;
    default:
      return notReachable(data);
  }
};
