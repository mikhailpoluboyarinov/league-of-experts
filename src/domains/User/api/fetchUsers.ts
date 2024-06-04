import { User } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchUsers = async (): Promise<User[]> => {
  const usersDto = await axios.get(API_HOST + "api/users");

  if (!Array.isArray(usersDto.data)) {
    throw new Error(
      "Ошибка валидации данных юзеров: ожидаем массив, пришел не массив.",
    );
  }

  try {
    return usersDto.data.map((user) => {
      return {
        id: user.id,
        chatId: user.chatId,
        name: user.firstName,
        lastName: user.lastName,
        photoUrl: "",
        winnerCount: user.winnerCount || 0,
        lastWinner: user.lastWinner,
        winnerPrediction: user.winnerPrediction,
        isAI: user.isAI,
        pariCount: user.pariCount,
      };
    });
  } catch (e) {
    throw new Error(
      "Ошибка валидации данных юзера: матч не соответствует типу.",
    );
  }
};
