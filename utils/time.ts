import useStore from "!stores";
import { PrayerController } from "!controllers/Prayer";
import { storeToRefs } from "pinia";

export const getToday = (): string => {
  const now = new Date();
  const londonDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(now);

  const [day, month, year] = londonDate.split('/');
  return `${year}-${month}-${day}`;
};

export const convert24hrToMillisecond = (time: string): number => {
  const [hour, minute] = time.split(":");

  const now = new Date();
  now.setHours(+hour);
  now.setMinutes(+minute);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now.getTime();
};

/**
 * This function runs a loop until midnight and checks for a new date every 1 minute.
 * If the current date is different from the stored date, it initializes a new prayer controller.
 * This function does not return anything and only logs a message when starting the loop.
 * It uses an interval instead of a timeout to avoid throttling.
 */
export const loopUntilMidnight = (): void => {
  console.log('Starting 1 min midnight loop...');

  const checkNewDateEveryMs = 60_000; // every 1 minute
  const Store = useStore();

  const intervalId = setInterval(async () => {
    if (getToday() === Store.prayersDate) return;

    await new PrayerController(Store).init();
    clearInterval(intervalId);

    console.log('New day. Loop closed.');
  }, checkNewDateEveryMs);
};