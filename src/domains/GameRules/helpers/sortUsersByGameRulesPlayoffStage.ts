// Сортируем Юзеров по правилам игры. Для плейофф этапа
//
// Победителем считается участник, набравший наибольшее количество очков в рамках зачета.
// Если два или более участника имеют равное количество очков, победителем считается тот,
// кто угадал наибольшее количество точных счетов в матчах. Если и здесь присутствует равенство,
// победитель определяется путем пятираундового противостояния в «камень-ножницы-бумагу».

//
export const sortUsersByGameRulesPlayoffStage = (a: any, b: any) => {
  const deltaTotalScorePlayoffStage = b.userPlayoffScore - a.userPlayoffScore;

  if (deltaTotalScorePlayoffStage === 0) {
    return b.exactScoresNumberPlayoffStage - a.exactScoresNumberPlayoffStage;
  }

  return deltaTotalScorePlayoffStage;
};
