import { Country } from "../../domains/Country";
import { Match } from "../../domains/Match";
import { Prediction } from "../../domains/Prediction";
import { Result } from "../../domains/Result";
import { User } from "../../domains/User";

type Props = {
  countries: Country[];
  matches: Match[];
  predictions: Prediction[];
  results: Result[];
  users: User[];
};
export const ScoresTable = (props: Props) => {
  const calculateScores = ({
    countries,
    matches,
    results,
    users,
    predictions,
  }: Props) => {
    users.map((user) => {});
  };

  return <div>ScoresTable</div>;
};
