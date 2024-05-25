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
import { fetchMisc } from "../domains/Misc/api/fetchMisc";
import { Misc } from "../domains/Misc";

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
        misc: Misc[];
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
      fetchMisc(),
    ])
      .then(([countries, matches, predictions, results, users, misc]) => {
        setData({
          type: "loaded",
          data: {
            countries,
            matches,
            predictions,
            results,
            users,
            misc,
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
