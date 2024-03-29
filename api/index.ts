export interface ISinglePrayer {
  date: string;
  fajr: string;
  fajr_jamat: string;
  sunrise: string;
  dhuhr: string;
  dhuhr_jamat: string;
  asr: string;
  asr_2: string;
  asr_jamat: string;
  magrib: string;
  magrib_jamat: string;
  isha: string;
  isha_jamat: string;
}

export interface IGetPrayersApiResponse {
  city: string;
  times: {
    [date: string]: ISinglePrayer
  };
}

const config = {
  key: "2a99f189-6e3b-4015-8fb8-ff277642561d",
  path: "times",
  format: "json",
  baseUrl: "https://www.londonprayertimes.com",
  get queries() {
    return [
      `format=${this.format}`,
      `key=${this.key}`,
      `year=${new Date().getFullYear()}`,
      '24hours=true'
    ].join("&");
  }
};

const urls = {
  getPrayersUrl: `${config.baseUrl}/api/${config.path}?${config.queries}`
};

export const get = async (): Promise<IGetPrayersApiResponse> => {
  const response = await useFetch<IGetPrayersApiResponse>(urls.getPrayersUrl, { cache: 'no-cache' });

  if (response.data?.value?.city) return response.data.value;

  console.error('Error full:', response)
  console.error('Error partial:', response.data.value)

  throw response;
};
