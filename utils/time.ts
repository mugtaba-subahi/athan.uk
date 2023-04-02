import useStore from "!stores";
import { PrayerController } from "!controllers/Prayer";
import { storeToRefs } from "pinia";

// return YYYY-MM-DD
export const getToday = () => new Date().toISOString().substring(0, 10);

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
 * This function runs a loop until midnight and checks for a new date every 5 minutes.
 * If the current date is different from the stored date, it initializes a new prayer controller.
 * This function does not return anything and only logs a message when starting the loop.
 * It uses an interval instead of a timeout to avoid throttling.
 */
export const loopUntilMidnight = (): void => {
  console.log('Starting 5 mins midnight loop...');

  const checkNewDateEveryMs = 300_000; // every 5 mins
  const Store = useStore();

  const intervalId = setInterval(async () => {
    if (getToday() === Store.prayersDate) return;

    await new PrayerController(Store).init();
    clearInterval(intervalId);

    console.log('New day. Loop closed.');
  }, checkNewDateEveryMs);
};