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
  prayers: IPrayerItem[];
  nextPrayerIndex: number;
  allPrayersPassed: boolean;
  dayOfMonth: number;
  isLoading: boolean;
  hasError: boolean;
}

export default defineStore("store", {
  state: (): IUseStoreState => ({
    prayers: [],
    nextPrayerIndex: -1,
    allPrayersPassed: false,
    dayOfMonth: new Date().getUTCDate(),
    isLoading: true,
    hasError: false
  })
});
