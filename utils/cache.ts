import { IGetPrayersApiResponse } from "!api";

interface ICacheData {
  updatedAt: Date;
  apiResult: IGetPrayersApiResponse;
}

export const getCache = (name: string): ICacheData | null => {
  const cache = localStorage.getItem(name);

  if (cache) return JSON.parse(cache);

  console.log(`no cache found for ${name}`);
  return null;
};

export const setCache = (name: string, data: ICacheData): void => {
  localStorage.setItem(name, JSON.stringify(data));
  console.log(`new cache set for ${name}`, { data });
};
