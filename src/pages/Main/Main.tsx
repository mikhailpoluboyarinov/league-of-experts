import { useFetchMainData } from "./hooks/useFetchMainData";
import { Typography } from "@mui/material";
import { notReachable } from "../../utils/notReachable";
import { ScoresTable } from "./ScoresTable";

export const Main = () => {
  const data = useFetchMainData();

  switch (data.type) {
    case "loading":
      return <Typography>Loading</Typography>;
    case "loaded":
      return (
        <ScoresTable
          countries={data.data.countries}
          matches={data.data.matches}
          predictions={data.data.predictions}
          results={data.data.results}
          users={data.data.users}
        />
      );
    case "error":
      return <Typography>Error</Typography>;
    default:
      return notReachable(data);
  }
};
