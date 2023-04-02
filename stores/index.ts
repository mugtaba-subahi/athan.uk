import { defineStore } from "pinia";

export interface IPrayerItem {
  english: string;
  time: string;
  arabic: string;
  passed: boolean;
  index: number;
  timeLeft: string;
}

export interface IUseStoreState {
  prayersDate: string;
  prayers: IPrayerItem[];
  nextPrayerIndex: number;
}

export default defineStore("store", {
  state: (): IUseStoreState => ({
    prayersDate: '',
    prayers: [],
    nextPrayerIndex: -1
  })
});
