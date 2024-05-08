import { useState, useEffect } from "react";
import { fetchCountries } from "../domains/Country/api/fetchCountries";
import { fetchMatches } from "../domains/Match/api/fetchMatches";
import { fetchPredictions } from "../domains/Prediction/api/fetchPredictions";
import { fetchResults } from "../domains/Result/api/fetchResults";
import { fetchUsers } from "../domains/User/api/fetchUsers";
import { Country } from "../domains/Country";
import { GameDay, Match } from "../domains/Match";
import { Prediction } from "../domains/Prediction";
import { Result } from "../domains/Result";
import { User } from "../domains/User";

type Data =
  | { type: "loading" }
  | {
      type: "loaded";
      data: {
        countries: Country[];
        matches: Match[];
        predictions: Prediction[];
        results: Result[];
        users: User[];
        currentGameDay: GameDay;
      };
    }
  | { type: "error" };

export const useFetchMainData = (): Data => {
  const [data, setData] = useState<Data>({ type: "loading" });
  useEffect(() => {
    Promise.all([
      fetchCountries(),
      fetchMatches(),
      fetchPredictions(),
      fetchResults(),
      fetchUsers(),
    ])
      .then(([countries, matches, predictions, results, users]) => {
        setData({
          type: "loaded",
          data: {
            countries,
            matches,
            predictions,
            results,
            users,
            currentGameDay: 3 as GameDay,
          },
        });
      })
      .catch(() => {
        setData({ type: "error" });
      });
  }, []);
  return data;
};
