import { Misc } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchMisc = async (): Promise<Misc> => {
  const miscDto = await axios.get(API_HOST + "api/misc");

  if (!Array.isArray(miscDto.data)) {
    throw new Error(
      "Ошибка валидации данных misc: ожидаем массив, пришел не массив.",
    );
  }

  try {
    return miscDto.data.map((misc) => {
      return {
        id: misc.id,
        currentGameDay: misc.currentGameDay,
        isRegistrationOpen: misc.isRegistrationOpen,
        winnerCountry: misc.winnerCountry,
      };
    })[0];
  } catch (e) {
    throw new Error(
      "Ошибка валидации данных misc: матч не соответствует типу.",
    );
  }
};
