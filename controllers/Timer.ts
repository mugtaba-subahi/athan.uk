import dayjs from "dayjs";
import TinyTimer from "tiny-timer";
import convertTime from "convert-time";

import { IPrayerItem } from "!stores/prayers";
import { IUseTimerStoreState } from "!stores/timer";

export class TimerController {
  private _timer = new TinyTimer();
  private store: IUseTimerStoreState;

  constructor(store: IUseTimerStoreState) {
    this.store = store;
  }

  public start = (prayersList: IPrayerItem[], nextPrayerIndex: number): void => {
    if (nextPrayerIndex === -1) return;

    const nextPrayerTime = TimerController.convert24hrToMillisecond(prayersList[nextPrayerIndex].time);
    const remainder = nextPrayerTime - new Date().getTime();

    this.store.finished = false;

    this._timer.start(remainder);
    this._timer.on("tick", this._onTick);
    this._timer.on("done", this._onDone);
  };

  private _onTick = (tick: number): void => {
    this.store.nextPrayerTimeLeft = TimerController.timeLeft(tick);
  };

  private _onDone = (): void => {
    this.store.finished = true;
  };

  private static validateTime = (time: string): boolean => {
    const militaryTimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (typeof time !== "string") return false;
    else if (!time.match(militaryTimeRegex)) return false;
    else return true;
  };

  // Utils
  public static timeLeft = (time: number) => {
    const current = dayjs("2000-01-01 00:00:00").add(new Date().getTime(), "ms").format("HH mm ss");
    const [hour, minute] = current.split(" ");

    let format = [""];
    hour !== "00" && format.push("H[h]");
    minute !== "00" && format.push("m[m]");
    format.push("s[s]");

    return dayjs("2000-01-01 00:00:00").add(time, "ms").format(format.join(" "));
  };

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
}
