import * as Api from "!api";
import { prayerNamesArabic, prayerNamesEnglish } from "!globals";
import { IPrayerItem, IUseStoreState } from "!stores";
import { getCache, setCache } from "!utils/cache";
import { forceApplicationRefresh } from "!utils/application";
import { convert12To24hr, convert24hrToMillisecond } from "!utils/time";

export class PrayerController {
  private Store: IUseStoreState;

  constructor(Store: IUseStoreState) {
    this.Store = Store;
  }

  public async init(): Promise<void> {
    const apiResult = await this._fetchPrayers();

    this._setApiResult(apiResult);
    this._setNextPrayerIndex();
  }

  private async _fetchPrayers(): Promise<Api.IGetPrayersApiResponse> {
    const cache = getCache("data");

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
      console.log("Compared dates on load", { updatedAt, today });
      console.log("Valid cache for today", { cache });
      return cache.apiResult;
    }

    // new date, old cache. clear cache and reload page
    forceApplicationRefresh();
  }

  private _setApiResult = (apiResult: Api.IGetPrayersApiResponse): void => {
    const prayers = prayerNamesEnglish.map((name, index): IPrayerItem => {
      const prayer = {
        index,
        arabic: prayerNamesArabic[index],
        english: name,
        passed: false,
        time: apiResult[name.toLocaleLowerCase()],
        timeLeft: "..."
      };

      const military = convert12To24hr(prayer.english, prayer.time);
      const time = convert24hrToMillisecond(military);
      const now = new Date().getTime();

      prayer.time = military;
      prayer.passed = now > time;

      return prayer;
    });

    this.Store.prayers = prayers;
  };

  private _setNextPrayerIndex = (): void => {
    this.Store.nextPrayerIndex = this.Store.prayers.findIndex((prayer) => !prayer.passed);
  };
}
