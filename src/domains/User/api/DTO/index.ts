import { User } from "../../index";
import { UserId } from "../../index";

export const users: User[] = [
  {
    id: "user001" as UserId,
    name: "John",
    photoUrl:
      "https://w.forfun.com/fetch/6c/6c4096cd8e8553f3d03818513c7024ee.jpeg",
    lastWinner: true,
    winnerPrediction: "RU",
  },
  {
    id: "user002" as UserId,
    name: "Jane",
    photoUrl:
      "https://pushinka.top/uploads/posts/2023-03/1679863379_pushinka-top-p-avatarka-sobaki-pinterest-46.jpg",
    lastWinner: false,
    winnerPrediction: "BR",
  },
  {
    id: "user003" as UserId,
    name: "Alice",
    photoUrl: "https://pix.avax.news/avaxnews/e6/c4/0002c4e6.jpeg",
    lastWinner: false,
    winnerPrediction: "FR",
  },
];
