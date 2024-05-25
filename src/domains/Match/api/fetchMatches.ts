import { Match } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchMatches = async (): Promise<Match[]> => {
  const matchesDto = await axios.get(API_HOST + "api/matches");

  if (!Array.isArray(matchesDto.data)) {
    throw new Error(
      "Ошибка валидации данных матчей: ожидаем массив, пришел не массив.",
    );
  }

  try {
    return matchesDto.data.map((match) => {
      return {
        type: match.type,
        id: match.id,
        hostId: match.hostId,
        guestId: match.guestId,
        startTime: match.startTime,
        gameDay: match.gameDay,
        isCloseForPrediction: match.isCloseForPrediction,
        description: match.description,
      };
    });
  } catch (e) {
    throw new Error(
      "Ошибка валидации данных матча: матч не соответствует типу.",
    );
  }
};
