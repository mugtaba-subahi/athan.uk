import { deleteCache } from "!utils/cache";

export const forceApplicationRefresh = async (): Promise<void> => {
  deleteCache("data");
  deleteCache("app_version");

  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.update();
    }
  }

  location.reload();
};
