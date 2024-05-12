import { useFetchMainData } from "../../hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { ScoresTableTotal } from "../../components/ScoresTableTotal/ScoresTableTotal";
import { Typography } from "@mui/material";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Layout } from "../../components/Layout/Layout";
import { TEXT_SHADOW } from "../../styles/shadows";

export const ScoresTableTotalPage = () => {
  const data = useFetchMainData();

  switch (data.type) {
    case "loading":
      return <Typography>Loading</Typography>;
    case "loaded":
      return (
        <>
          <Header />

          <Layout>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              style={{
                paddingTop: "40px",
                textShadow: TEXT_SHADOW.purple,
              }}
            >
              Таблица чемпионата
            </Typography>
            <ScoresTableTotal
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
