import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import {
  Box,
  Container,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import logoEuro24 from "../../images/logo_euro24.jpeg";
import extraPoints from "../../images/extraPoints.png";

export const GameRulesPage = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Header />
      <Container style={{ paddingTop: "20px" }}>
        <Box sx={{ mb: 4 }}>
          <Typography align="center" variant="h4" gutterBottom>
            Лига Экспертов ЧE 2024
          </Typography>
          <Typography align="center" variant="subtitle1" paragraph>
            Четвертый розыгрыш Лиги Экспертов уже почти рядом! Пристегивайте
            ремни, мы начинаем!{" "}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="EURO24"
              src={logoEuro24}
              style={{
                width: isSmallScreen ? "300px" : "600px",
                height: isSmallScreen ? "150px" : "300px",
                paddingTop: "20px",
                backgroundSize: "cover",
              }}
            />
          </div>

          <Typography variant="h5" gutterBottom style={{ paddingTop: "20px" }}>
            Общие положения
          </Typography>
          <Typography variant="body1" paragraph>
            Лига Экспертов Чемпионата Европы по футболу 2024 - официальное
            соревнование, посвященное главному европейскому футбольному событию
            этого года, призванное проверить аналитические способности
            участников в сфере футбола, а так же подарить порцию
            соревновательного азарта, адреналина и конечно же отличного
            настроения на протяжении целого месяца во время проведения
            официальной части ЧЕ по футболу.
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Спонсоры мероприятия
          </Typography>
          <Typography variant="body1" paragraph>
            <b>Титульным спонсором</b> Лиги Экспертов в этот раз выступает
            секретный Дубайский крипто-фонд, который решил не выдавать своего
            названия.
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Процесс
          </Typography>
          <Typography variant="body1" paragraph>
            Каждый игровой день организатор <b>@alexdivin</b> оглашает список
            матчей для прогноза. Участники соревнования прогнозируют исходы
            матчей ЧМ посредством официального телеграм-бота Лиги Экспертов{" "}
            <b>@LOE2024_bot</b> ДО начала матча, либо, в исключительных случаях
            технических неполадок посредством личного сообщения организатору.
            Перед каждым матчем организатор вывешивает результаты голосования на
            матч от участников в группу. По завершении игрового дня
            организатором подсчитывается количество очков, набранных участниками
            и оглашается в группе.
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Правила подсчета очков
          </Typography>
          <Typography variant="body1" paragraph>
            <b>Групповой этап:</b>
            <br />— исход матча — <b>2 очка</b>
            <br />— исход и разница мячей — <b>3 очка</b>
            <br />— точный счет матча — <b>5 очков</b>
            <br />
            <br />
            <b>Раунд плей-офф:</b>
            <br />
            <b>Основное время:</b>
            <br />— исход матча — <b>4 очка</b>
            <br />— исход и разница мячей — <b>6 очков</b>
            <br />— точный счет матча — <b>10 очков</b>
            <br />
            <br />
            <b>Дополнительное время:</b>
            <br />— победа хозяев в доп. время — <b>4 очка</b>
            <br />— победа хозяев по пенальти — <b>4 очка</b>
            <br />— победа гостей в доп. время — <b>4 очка</b>
            <br />— победа гостей по пенальти — <b>4 очка</b>
            <br />
            <br />
            Правильный прогноз на победителя ЧЕ2024 — <b>15 очков</b>
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Выставочный матч
          </Typography>
          <Typography variant="body1" paragraph>
            На групповом этапе в результате голосования участниками Лиги
            Экспертов будет определены по одному матчу на каждый тур группового
            этапа <b>(всего 3 матча)</b>. За успешные прогнозы на выставочные
            матчи будут начисляться <b>двойные очки</b>:
            <br />
            <br />— исход матча — <b>4 очка</b>
            <br />— исход и разница мячей — <b>6 очков</b>
            <br />— точный счет матча — <b>10 очков</b>
            <br />
            <br />
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Рука Бога
          </Typography>
          <Typography variant="body1" paragraph>
            На групповом этапе у каждого из участников будет возможность
            вмешаться и изменить ход негативно складывающегося прогноза в свою
            пользу. Как это работает: если эксперт хочет изменить прогноз, то
            строго до начала второго тайма он пишет об этом в группе, и туда же
            в группу пишет новый счет прогноза. Организатор принимает изменение
            и вносит новый прогноз в таблицу. У каждого из экспертов есть 2
            “руки бога” на 36 матчей группового этапа + 1 дополнительная рука на
            раунд 1/8 финала. В четвертьфиналах, полуфиналах и финале игра
            руками запрещена.
            <br />
            <br />* Рука Бога может быть использована 1 раз за игровой день
            <br />
            ** Рука Бога не доступна на выставочные матчи с двойными очками
            группового этапа
            <br />
            *** Рука Бога не доступна в четвертьфиналах, полуфиналах и финале
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Нагретые шары
          </Typography>
          <Typography variant="body1" paragraph>
            Каждый эксперт может спрогнозировать команды, которые попадут в
            раунд плей-офф, и получить дополнительные очки в зачет группового
            этапа, если он угадает верно:
            <br />
            <br />— 12 из 16 команд - <b>1 очко</b>
            <br />— 13 из 16 команд - <b>2 очка</b>
            <br />— 14 из 16 команд - <b>3 очка</b>
            <br /> — 15 из 16 команд - <b>4 очка</b>
            <br />— 16 из 16 команд - <b>5 очков</b>
            <br />
            <br /> Список команд прогнозируется в личном сообщении организатору.
            Прогнозы принимаются строго до стартового свистка матча-открытия на
            ЕВРО.
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Пари с Осьминогом Паулем
          </Typography>
          <Typography variant="body1" paragraph>
            У каждого участника появляется возможность предложить пари на матч
            нашему секретному эксперту в лице Осьминога Пауля — <b>3</b> раза на
            групповом этапе и <b>2</b> раза в раунде плей-офф. Правила пари:{" "}
            <br />— Осьминог Пауль делает свой прогноз на матч до его начала{" "}
            <br />— участник делает прогноз на матч до его начала и отмечает
            этот матч как "пари против Осьминога Пауля" в официальном
            телеграм-боте <br />
            <br />
            Алгоритм определения победителя в пари: <br />
            1. Считаем кол-во очков, которое набрал прогноз эксперта <br />
            2. Считаем кол-во очков, которое набрал прогноз Осьминога Пауля{" "}
            <br />
            3. Победителем пари считается тот, кто набрал большее кол-во очков
            Победителю пари на групповом этапе записывается <b>3</b> очка в
            таблицу, проигравший теряет <b>3</b>
            очка. В раунде плей-офф стоимость пари - <b>6</b> очков. После пари,
            очки за прогноз, если таковые имеются, добавляются обоим участникам
            по обычным правилам Лиги. <br />
            <br />
            <b>Пример:</b> <br />
            Матч группового этапа: Италия - Албания <br />
            Результат: 1-0 Италия победила <br />
            Прогноз эксперта: 1-0 на Албанию
            <br />
            Прогноз Осьминога Пауля: 1-0 на Италию <br />
            <br />
            Эксперт промахивается с прогнозом и получает 0 очков за прогноз, а
            так же проигрывает пари, получая -3 очка. Осьминог Пауль угадывает
            счет и получает 3 очка за победу в пари + 5 очков за точно угаданный
            счет по нашим обычным правилам Если эксперт и Осьминог Пауль набрали
            одинаковое кол-во очков, пари считается состоявшимся, но без
            победителя. Никто не получает дополнительные очки за пари.
            <br />
            <br /> * пари с Осьминогом Паулем не доступно на матч-открытия{" "}
            <br />
            ** пари с Осьминогом Паулем не доступно на выставочные матчи
            группового этапа с двойными очками <br />
            *** в пари с Осьминогом Паулем не доступно использование “Руки Бога”
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Таблица дополнительных возможностей набрать очки:
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "left",
            }}
          >
            <img
              alt="extraPoints"
              src={extraPoints}
              style={{
                width: isSmallScreen ? "300px" : "800px",
                height: isSmallScreen ? "100px" : "200px",
                paddingTop: "20px",
              }}
            />
          </div>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Определение победителя
          </Typography>
          <Typography variant="body1" paragraph>
            Победителем считается участник, набравший наибольшее количество
            очков в рамках зачета. Если два или более участника имеют равное
            количество очков, победителем считается тот, кто угадал наибольшее
            количество точных счетов в матчах. Если и здесь присутствует
            равенство, победитель определяется путем пятираундового
            противостояния в «камень-ножницы-бумагу».
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Вступительный взнос
          </Typography>
          <Typography variant="body1" paragraph>
            Вступительный взнос — <b>1 000 рублей</b>
            Взносы отправляйте на Сбербанк или Тинькофф по номеру телефона{" "}
            <b>+79119872521</b>
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Призовой фонд
          </Typography>
          <Typography variant="body1" paragraph>
            Призовой фонд формируется по формуле{" "}
            <b>(взнос * кол-во участников) * 2 (Осьминог Пауль guarantee)</b>,
            т.е. при условии наличия <b>14</b> участников, официальный призовой
            фонд составляет <b>28 0000 рублей</b>.
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Распределение призов
          </Typography>
          <Typography variant="body1" paragraph>
            В рамках ЧE будет проведён 51 матч. Стадия группового этапа — 36
            матчей, и раунд плей-офф в рамках которого пройдут заключительные 15
            матчей. Соответственно, лига экспертов предполагает два отдельных
            зачета, победители которых будут награждены специальными призами, а
            так же общий зачет экспертов, победители которого получат главные
            призы и разыграют общий призовой фонд турнира.
            <br />
            <br />
            Отдельного приза от титульного спонсора удостоится эксперт,
            угадавший наибольшее количество точных результатов.
            <br />
            <br />
            <b>Промежуточный зачёт группового этапа:</b>
            <br />1 место — <b>1000 рублей</b>
            <br />
            <br />
            <b>Промежуточный зачёт раунда плей-офф:</b>
            <br />1 место — <b>1000 рублей</b>
            <br />
            <br />
            <b>Общий зачет:</b>
            <br />1 место — <b>65% от общего призового фонда</b>
            <br />2 место — <b>25% от общего призового фонда</b>
            <br />3 место — <b>10% от общего призового фонда</b>
            <br />
            <br />
            <b>Удачи всем экспертам!!! 🙂🙂🙂</b>
            <br />
            <br />
          </Typography>
          <Divider />
        </Box>
      </Container>
      <Footer />
    </>
  );
};
