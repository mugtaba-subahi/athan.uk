const success = (registration) => {
  console.log("SW registration successful with scope: ", registration.scope);
};

const failed = (err) => {
  console.log("SW registration failed: ", err);
};

if ("serviceWorker" in navigator) {
  setTimeout(() => {
    navigator.serviceWorker.register("/sw.js").then(success, failed);
  }, 2000);
}
