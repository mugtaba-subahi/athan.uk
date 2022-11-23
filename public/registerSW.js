const success = (registration) => {
  console.log("SW registration successful with scope: ", registration.scope);
};

const failed = (err) => {
  console.log("SW registration failed: ", err);
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(success, failed);
}


console.log('1111111111111111111111111111XX');

const audio = new Audio('athan.mp3');

console.log(audio);
console.log('playing audio nowww');
audio.play();

console.log('2222222222222222222222EEE');
