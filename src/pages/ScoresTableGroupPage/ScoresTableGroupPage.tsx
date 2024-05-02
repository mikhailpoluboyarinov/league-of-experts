import { useFetchMainData } from "../Main/hooks/useFetchMainData";
import { notReachable } from "../../utils/notReachable";
import { ScoresTableGroupStage } from "../../components/ScoresTableGroupStage/ScoresTableGroupStage";
import { Typography } from "@mui/material";

export const ScoresTableGroupPage = () => {
  const data = useFetchMainData();

  switch (data.type) {
    case "loading":
      return <Typography>Loading</Typography>;
    case "loaded":
      return (
        <ScoresTableGroupStage
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
