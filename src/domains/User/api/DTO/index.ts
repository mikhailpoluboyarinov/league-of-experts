import { User, UserWinnerCount } from "../../index";
import { UserId } from "../../index";
import { CountryId } from "../../../Country";

export const users: User[] = [
  {
    id: 1 as UserId,
    chatId: "001",
    name: "John12333123",
    lastName: "Canon",
    photoUrl:
      "https://w.forfun.com/fetch/6c/6c4096cd8e8553f3d03818513c7024ee.jpeg",
    winnerCount: 1 as UserWinnerCount,
    lastWinner: true,
    winnerPrediction: 11 as CountryId,
  },
  {
    id: 2 as UserId,
    chatId: "002",
    name: "Jane",
    lastName: "Capron",
    photoUrl:
      "https://pushinka.top/uploads/posts/2023-03/1679863379_pushinka-top-p-avatarka-sobaki-pinterest-46.jpg",
    winnerCount: 2 as UserWinnerCount,
    lastWinner: false,
    winnerPrediction: 12 as CountryId,
  },
  {
    id: 3 as UserId,
    chatId: "003",
    name: "Alice",
    lastName: "Bolduin",
    photoUrl: "https://pix.avax.news/avaxnews/e6/c4/0002c4e6.jpeg",
    winnerCount: 0 as UserWinnerCount,
    lastWinner: false,
    winnerPrediction: 13 as CountryId,
  },
];
