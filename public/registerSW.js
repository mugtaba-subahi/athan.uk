console.log("111111111111");

if ("serviceWorker" in navigator) {
  console.log("22222222222");

  window.addEventListener("load", () => {
    console.log("3333333");
    navigator.serviceWorker.register("/sw.js", { scope: "/" });
  });
}
