import { useFetchMainData } from "../../hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { ScoresTableTotal } from "../../components/ScoresTableTotal/ScoresTableTotal";
import { Typography } from "@mui/material";

export const ScoresTableTotalPage = () => {
  const data = useFetchMainData();

  switch (data.type) {
    case "loading":
      return <Typography>Loading</Typography>;
    case "loaded":
      return (
        <ScoresTableTotal
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
