import { deleteCache } from "!utils/cache";

export const forceApplicationRefresh = async (): Promise<void> => {
  deleteCache("data");
  deleteCache("app_version");


  console.log('1111');
  if ('serviceWorker' in navigator) {
    console.log('2222');

    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log('33333');
    console.log(registrations);
    
    for (const registration of await registrations) {
      console.log('444');
      registration.unregister();
    }
    
  }

  console.log('55555');


  // location.reload();
};
