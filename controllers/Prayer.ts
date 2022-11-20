import * as Api from "!api";
import { TimerController } from "!controllers/Timer";
import { prayerNamesArabic, prayerNamesEnglish } from "!globals";
import { IPrayerItem, IUseStoreState } from "!stores";
import { getCache, setCache } from "!utils/cache";

export class PrayerController {
  private Store: IUseStoreState;

  constructor(Store: IUseStoreState) {
    this.Store = Store;
  }

  public async init(): Promise<void> {
    const [apiResult, error] = await PrayerController.fetchPrayers()
      .then((result) => [result, null])
      .catch((error) => [null, error]);

    if (error) {
      console.log(error);
      this.Store.isLoading = false;
      this.Store.hasError = true;
      return;
    }

    this.setApiResult(apiResult);
    this.setNextPrayerIndex();
  }

  public static async fetchPrayers() {
    console.log('Cache is currently disabled until further PWA progress');
    const disableCache = true;
    const cache = disableCache ? null : getCache("data");

    if (!cache) {
      // get prayers times and set new cache cache
      const apiResult = await Api.get();
      setCache("data", { updatedAt: new Date(), apiResult });

      return apiResult;
    }

    // prepare date check
    const today = new Date().getDate();
    const updatedAt = new Date(cache.updatedAt).getDate();

    if (today === updatedAt) {
      console.log("Compared dates", { updatedAt, today });
      console.log("Valid cache for today", { cache });
      return cache.apiResult;
    }

    console.log("Outdated cache", { cache });

    // cache outdated. set new cache
    const apiResult = await Api.get();
    setCache("data", { updatedAt: new Date(), apiResult });

    return apiResult;
  }

  public setNextPrayerIndex = (): void => {
    this.Store.nextPrayerIndex = this.Store.prayers.findIndex((prayer) => !prayer.passed);
  };

  public setApiResult = (apiResult: Api.IGetPrayersApiResponse): void => {
    const prayers = prayerNamesEnglish.map((name, index): IPrayerItem => {
      const prayer = {
        index,
        arabic: prayerNamesArabic[index],
        english: name,
        passed: false,
        time: apiResult[name.toLocaleLowerCase()],
        timeLeft: "..."
      };

      const military = TimerController.convert12To24hr(prayer.english, prayer.time);
      const time = TimerController.convert24hrToMillisecond(military);
      const now = new Date().getTime();

      prayer.time = military;
      prayer.passed = now > time;

      return prayer;
    });

    this.Store.prayers = prayers;
  };
}
