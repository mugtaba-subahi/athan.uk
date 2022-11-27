import dayjs from "dayjs";
import TinyTimer from "tiny-timer";
import convertTime from "convert-time";
import { IUseStoreState } from "!stores";
import { getCache } from "!utils/cache";
import { forceApplicationRefresh } from "!utils/application";


export class TimerController {
  private _timer = new TinyTimer();
  private Store: IUseStoreState;
  private prayerIndex: number;

  constructor(Store: IUseStoreState, prayerIndex) {
    this.Store = Store;
    this.prayerIndex = prayerIndex;
  }

  public start = (): void => {
    const prayer = this.Store.prayers[this.prayerIndex];
    const nextPrayerTime = TimerController.convert24hrToMillisecond(prayer.time);
    const remainder = nextPrayerTime - new Date().getTime();

    this._timer.start(remainder);
    this._timer.on("tick", this._onTick);
    this._timer.on("done", this._onDone);
  };

  private _onTick = (tick: number): void => {
    const timeLeft = dayjs("2000-01-01 00:00:00").add(tick, "ms");

    let format = [""];
    timeLeft.hour() && format.push("H[h]");
    timeLeft.minute() && format.push("m[m]");
    format.push("s[s]");

    this.Store.prayers[this.prayerIndex].timeLeft = timeLeft.format(format.join(" "));
  };

  private _onDone = (): void => {
    this.Store.prayers[this.prayerIndex].passed = true;

    const isLastPrayer = this.prayerIndex === this.Store.prayers.length - 1;

    if (!isLastPrayer) {
      this.Store.nextPrayerIndex++;
      return;
    }

    this.Store.nextPrayerIndex = -1
    this.startMidnightTimeout();
  };

  public startMidnightTimeout(): void {
    const timeLeftUntilMidnight = TimerController.timeLeftUntilMidnight();
    setTimeout(() => forceApplicationRefresh(), timeLeftUntilMidnight)
    console.log("Set timer for midnight refresh", { timeLeftUntilMidnight });
  }

  private static validateTime = (time: string): boolean => {
    const militaryTimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (typeof time !== "string") return false;
    else if (!time.match(militaryTimeRegex)) return false;
    else return true;
  };

  // Utils
  public static convert12To24hr = (name: string, time: string): string => {
    const isValidTime: boolean = TimerController.validateTime(time);
    if (!isValidTime) throw { error: true, message: "Invalid time" };

    if (name === "Dhuhr") {
      const [dhuhr_hour] = time.split(":");

      // check if dhuhr is in afternoon or morning. 5(pm)
      if (+dhuhr_hour < 5) return convertTime(`${time} PM`, "hh:MM");
    }

    const pmPrayers: string[] = ["Asr", "Magrib", "Isha"];
    if (pmPrayers.indexOf(name) !== -1) return convertTime(`${time} PM`, "hh:MM");

    return time;
  };

  public static convert24hrToMillisecond = (time: string): number => {
    const isValidTime: boolean = TimerController.validateTime(time);
    if (!isValidTime) throw { error: true, message: "Invalid time" };

    const [hour, minute] = time.split(":");

    const now = new Date();
    now.setHours(+hour);
    now.setMinutes(+minute);
    now.setSeconds(0);

    return now.getTime();
  };

  public static timeLeftUntilMidnight(): number {
    const now = new Date();

    const midnight = new Date();
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0);
    midnight.setMinutes(0);
    midnight.setSeconds(1);
    midnight.setMilliseconds(0);

    return midnight.getTime() - now.getTime()
  }
}
