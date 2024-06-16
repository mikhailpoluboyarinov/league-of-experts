import { useFetchMainData } from "../../hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { ScoresTableTotal } from "../../components/ScoresTableTotal/ScoresTableTotal";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Layout } from "../../components/Layout/Layout";
import { Title } from "../../components/Title/Title";
import { Loader } from "../../components/Loader/Loader";
import { Error } from "../../components/Error/Error";

export const ScoresTableTotalPage = () => {
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
            <Title title="Общий зачет" />
            <ScoresTableTotal
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
      return (
        <>
          <Error />
        </>
      );
    default:
      return notReachable(data);
  }
};
