import { version } from '../package.json';

export const appIsOutdated = () => {
  const cacheVersion = localStorage.getItem("app_version");

  console.log('App versions: ', { latest: version, cached: cacheVersion });

  if (!cacheVersion) {
    localStorage.setItem("app_version", version);
    return false;
  };

  return version !== cacheVersion;
};