import { Misc } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchMisc = async (): Promise<Misc> => {
  try {
    const response = await axios.get(API_HOST + "api/misc");

    if (response.status !== 200) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }

    const miscDto = response.data;

    if (!Array.isArray(miscDto)) {
      throw new Error(
        "Ошибка валидации данных стран: ожидаем массив, пришел не массив.",
      );
    }

    return miscDto.map((misc) => ({
      id: misc.id,
      currentGameDay: misc.currentGameDay,
      isRegistrationOpen: misc.isRegistrationOpen,
      winnerCountry: misc.winnerCountry,
    }))[0];
  } catch (error) {
    console.error("Ошибка при получении данных misc:", error);
    throw error;
  }
};
