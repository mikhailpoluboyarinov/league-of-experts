import { useFetchMainData } from "../../hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { ScoresTableGroupStage } from "../../components/ScoresTableGroupStage/ScoresTableGroupStage";
import { Typography, Stack, Skeleton } from "@mui/material";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Layout } from "../../components/Layout/Layout";
import { Title } from "../../components/Title/Title";

export const ScoresTableGroupPage = () => {
  const data = useFetchMainData();

  switch (data.type) {
    case "loading":
      return (
        <Stack spacing={1}>
          <Skeleton variant="circular" width={240} height={240} />
          <Skeleton variant="rectangular" width={410} height={260} />
          <Skeleton variant="rounded" width={410} height={260} />
        </Stack>
      );
    case "loaded":
      return (
        <>
          <Header />

          <Layout>
            <Title title="Таблица группового этапа" />
            <ScoresTableGroupStage
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
