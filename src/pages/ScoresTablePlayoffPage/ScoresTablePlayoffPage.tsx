import { useFetchMainData } from "../../hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { ScoresTablePlayoffStage } from "../../components/ScoresTablePlayoffStage/ScoresTablePlayoffStage";
import { Typography } from "@mui/material";

export const ScoresTablePlayoffPage = () => {
  const data = useFetchMainData();

  switch (data.type) {
    case "loading":
      return <Typography>Loading</Typography>;
    case "loaded":
      return (
        <ScoresTablePlayoffStage
          countries={data.data.countries}
          matches={data.data.matches}
          predictions={data.data.predictions}
          results={data.data.results}
          users={data.data.users}
          currentGameDay={data.data.currentGameDay}
        />
      );
    case "error":
      return <Typography>Error</Typography>;
    default:
      return notReachable(data);
  }
};
