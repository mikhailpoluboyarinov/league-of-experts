// Ф-я для обратного отсчета до матча, отображается если остается меньше одного дня
export const calculateMatchCountdownTimer = (startTimeMatch: number) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  let timeDifference = startTimeMatch - currentTimestamp;

  //21600 = 6 часов
  if (timeDifference > 21600 || timeDifference <= 0) {
    return null;
  }

  const days = Math.floor(timeDifference / (24 * 3600));
  timeDifference %= 24 * 3600;
  const hours = Math.floor(timeDifference / 3600);
  timeDifference %= 3600;
  const minutes = Math.floor(timeDifference / 60);
  const seconds = timeDifference % 60;

  if (days > 0) {
    return null;
  } else {
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
  }
};
