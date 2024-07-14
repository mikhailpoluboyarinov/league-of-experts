import { User } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(API_HOST + "api/users");

    if (response.status !== 200) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }

    const usersDto = response.data;

    if (!Array.isArray(usersDto)) {
      throw new Error(
        "Ошибка валидации данных юзеров: ожидаем массив, пришел не массив.",
      );
    }

    return usersDto.map((user) => ({
      id: user.id,
      chatId: user.chatId,
      name: user.firstName,
      lastName: user.lastName,
      photoUrl: "",
      winnerCount: user.winnerCount || 0,
      lastWinner: user.lastWinner,
      winnerPrediction: user.winnerPrediction,
      hotBallPoints: user.hotBallPoints || 0,
      winnerPoints: user.winnerPoints || 0,
      isAI: user.isAI,
    }));
  } catch (error) {
    console.error("Ошибка при получении данных юзеров:", error);
    throw error;
  }
};
