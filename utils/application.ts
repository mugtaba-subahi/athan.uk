import { deleteCache } from "!utils/cache";

export const forceApplicationRefresh = (): void => {
  deleteCache("data");
  location.reload();
};
