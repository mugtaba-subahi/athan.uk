import { registerSW } from "virtual:pwa-register";

console.log("LOL");
if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW();
}
