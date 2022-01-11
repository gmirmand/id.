export const roundTime = (time, down = true) => {
  const roundTo = 15; // minutes
  const roundDownTime = roundTo * 60 * 1000;

  return down
    ? time - (time % roundDownTime)
    : time + (roundDownTime - (time % roundDownTime));
};

export const toTime = (tms) => {
  return new Date(
    tms.year,
    tms.month - 1,
    tms.day,
    tms.hour,
    tms.minute
  ).getTime();
};
