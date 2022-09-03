console.log("11111");

if ("serviceWorker" in navigator) {
  console.log("22222");

  window.addEventListener("load", () => {
    console.log("3333");

    navigator.serviceWorker.register("/sw.js", { scope: "/" });
  });
}
