const success = (registration) => {
  console.log("SW registration successful with scope: ", registration.scope);
};

const failed = (err) => {
  console.log("SW registration failed: ", err);
};

console.log("11111111111");

window.onload = (event) => {
  console.log("22222222");

  if ("serviceWorker" in navigator) {
    console.log("3333333");

    navigator.serviceWorker.register("/sw.js").then(success, failed);
  }
};
