// Сортируем Юзеров по правилам игры. Для группового этапа
//
// Победителем считается участник, набравший наибольшее количество очков в рамках зачета.
// Если два или более участника имеют равное количество очков, победителем считается тот,
// кто угадал наибольшее количество точных счетов в матчах. Если и здесь присутствует равенство,
// победитель определяется путем пятираундового противостояния в «камень-ножницы-бумагу».

//
export const sortUsersByGameRulesGroupStage = (a: any, b: any) => {
  const deltaTotalScoreGroupStage = b.userGroupScore - a.userGroupScore;

  if (deltaTotalScoreGroupStage === 0) {
    return b.exactScoresNumberGroupStage - a.exactScoresNumberGroupStage;
  }

  return deltaTotalScoreGroupStage;
};
