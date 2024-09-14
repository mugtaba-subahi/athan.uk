export const appIsOutdated = async () => {
  const response = await fetch("/package.json");
  const { version } = await response.json();
  const cacheVersion = localStorage.getItem("app_version");

  console.log('App versions: ', { latest: version, cached: cacheVersion });

  if (!cacheVersion) {
    localStorage.setItem("app_version", version);
    return false;
  };

  return version !== cacheVersion;
};