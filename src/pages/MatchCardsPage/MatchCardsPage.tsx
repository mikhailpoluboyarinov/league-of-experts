import { useFetchMainData } from "../../hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { ScoresTableTotal } from "../../components/ScoresTableTotal/ScoresTableTotal";
import { Typography } from "@mui/material";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Layout } from "../../components/Layout/Layout";
import { Title } from "../../components/Title/Title";
import { MatchCardsContainer } from "../../components/MatchCardsContainer/MatchCardsContainer";
import { Loader } from "../../components/Loader/Loader";

export const MatchCardsPage = () => {
  const data = useFetchMainData();

  switch (data.type) {
    case "loading":
      return (
        <>
          <Header />

          <Layout>
            <Loader />
          </Layout>

          <Footer />
        </>
      );
    case "loaded":
      return (
        <>
          <Header />

          <Layout>
            <Title title="Матчи" />

            <MatchCardsContainer
              countries={data.data.countries}
              matches={data.data.matches}
              predictions={data.data.predictions}
              results={data.data.results}
              users={data.data.users}
              currentGameDay={data.data.misc.currentGameDay}
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
