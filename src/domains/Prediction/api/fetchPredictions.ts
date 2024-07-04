import { Prediction } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";
import { notReachable } from "../../../utils/notReachable";

export const fetchPredictions = async (): Promise<Prediction[]> => {
  try {
    const response = await axios.get(API_HOST + "api/predictions");

    if (response.status !== 200) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }

    const predictionsDto = response.data;

    if (!Array.isArray(predictionsDto)) {
      throw new Error(
        "Ошибка валидации данных прогноз: ожидаем массив, пришел не массив.",
      );
    }

    return predictionsDto.map((prediction) => {
      switch (prediction.type) {
        case "group":
          return {
            type: "group",
            id: prediction.id,
            userId: prediction.userId,
            matchId: prediction.matchId,
            hostScore: prediction.hostScore,
            guestScore: prediction.guestScore,
            isPari: prediction.isPari,
            isAIPrediction: prediction.isAIPrediction,
          };
        case "play_off":
          return {
            type: "play_off",
            id: prediction.id,
            userId: prediction.userId,
            matchId: prediction.matchId,
            hostScore: prediction.hostScore,
            guestScore: prediction.guestScore,
            extra: prediction.extra,
            isPari: prediction.isPari,
            isAIPrediction: prediction.isAIPrediction,
          };
        default:
          return notReachable(prediction as never);
      }
    });
  } catch (error) {
    console.error("Ошибка при получении данных предикшенов:", error);
    throw error;
  }
};
