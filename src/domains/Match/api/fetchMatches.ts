import { Match } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await axios.get(API_HOST + "api/matches");

    if (response.status !== 200) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }

    const matchesDto = response.data;

    if (!Array.isArray(matchesDto)) {
      throw new Error(
        "Ошибка валидации данных стран: ожидаем массив, пришел не массив.",
      );
    }

    return matchesDto.map((match) => ({
      type: match.type,
      id: match.id,
      hostId: match.hostId,
      guestId: match.guestId,
      startTime: match.startTime,
      gameDay: match.gameDay,
      isClosedForPrediction: match.isClosedForPrediction,
      isDoublePoints: match.isDoublePoints,
      description: match.description,
    }));
  } catch (error) {
    console.error("Ошибка при получении данных матчей:", error);
    throw error;
  }
};
