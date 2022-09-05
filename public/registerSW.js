const success = (registration) => {
  console.log("SW registration successful with scope: ", registration.scope);
};

const failed = (err) => {
  console.log("SW registration failed: ", err);
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(success, failed);
}
