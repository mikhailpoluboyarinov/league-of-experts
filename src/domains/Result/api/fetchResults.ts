import { Result } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";
import { notReachable } from "../../../utils/notReachable";

export const fetchResults = async (): Promise<Result[]> => {
  try {
    const response = await axios.get(API_HOST + "api/results");

    if (response.status !== 200) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }

    const resultsDto = response.data;

    if (!Array.isArray(resultsDto)) {
      throw new Error(
        "Ошибка валидации данных РЕЗУЛЬТАТОВ: ожидаем массив, пришел не массив.",
      );
    }

    return resultsDto.map((result) => {
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
  } catch (error) {
    console.error("Ошибка при получении данных результатов:", error);
    throw error;
  }
};
