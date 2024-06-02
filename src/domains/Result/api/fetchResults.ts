import { Result } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";
import { notReachable } from "../../../utils/notReachable";

export const fetchResults = async (): Promise<Result[]> => {
  const resultsDto = await axios.get(API_HOST + "api/results");

  if (!Array.isArray(resultsDto.data)) {
    throw new Error(
      "Ошибка валидации данных РЕЗУЛЬТАТОВ: ожидаем массив, пришел не массив.",
    );
  }

  try {
    return resultsDto.data.map((result) => {
      switch (result.type) {
        case "group":
          return {
            type: "group",
            id: result.id,
            matchId: result.matchId,
            hostScore: result.hostScore,
            guestScore: result.guestScore,
          };
        case "play_off":
          return {
            type: "play_off",
            id: result.id,
            matchId: result.matchId,
            hostScore: result.hostScore,
            guestScore: result.guestScore,
            extra: result.extra,
          };
        default:
          return notReachable(result as never);
      }
    });
  } catch (e) {
    throw new Error(
      "Ошибка валидации данных стран: РЕЗУЛЬТАТ не соответствует типу.",
    );
  }
};
