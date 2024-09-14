import { deleteCache } from "!utils/cache";

export const forceApplicationRefresh = async (): Promise<void> => {
  // deleteCache("data");
  // deleteCache("app_version");


  console.log('1111');
  if ('serviceWorker' in navigator) {
    console.log('2222');

    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log('33333');
    console.log(registrations);
    
    for (const registration of registrations) {
      console.log('444');
      const x = await registration.unregister();
      console.log(x);
      console.log('55555');

    }
    
  }

  console.log('66666');

  if ('serviceWorker' in navigator) {
    console.log('77777');

    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log('88888');
    console.log(registrations);
    
    for (const registration of registrations) {
      console.log('99999');
      const e = await registration.unregister();
      console.log(e);
      console.log('10101010');

    }
    
  }

  console.log('11.11.11.11.11');


  location.reload();
};
