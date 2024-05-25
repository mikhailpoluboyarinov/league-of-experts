import { Prediction } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";
import { notReachable } from "../../../utils/notReachable";

export const fetchPredictions = async (): Promise<Prediction[]> => {
  const predictionsDto = await axios.get(API_HOST + "api/predictions");

  if (!Array.isArray(predictionsDto.data)) {
    throw new Error(
      "Ошибка валидации данных прогноз: ожидаем массив, пришел не массив.",
    );
  }

  try {
    return predictionsDto.data.map((prediction) => {
      switch (prediction.type) {
        case "group":
          return {
            type: "group",
            id: prediction.id,
            userId: prediction.userId,
            matchId: prediction.matchId,
            hostScore: prediction.hostScore,
            guestScore: prediction.guestScore,
          };
        case "play_off":
          return {
            type: "play_off",
            id: prediction.id,
            userId: prediction.userId,
            matchId: prediction.matchId,
            hostScore: prediction.hostScore,
            guestScore: prediction.guestScore,
            extra: { type: "no_extra" },
          };
        default:
          return notReachable(prediction as never);
      }
    });
  } catch (e) {
    throw new Error(
      "Ошибка валидации данных стран: прогноз не соответствует типу.",
    );
  }
};
