import { deleteCache } from "!utils/cache";

export const forceRefreshApplication = (): void => {
  deleteCache("data");
  location.reload();
};
