const cache = require('./cache.json');

const result = cache.result;
const currentTime = new Date();
const [day1, day2] = Object.keys(result.times);

const updatedDay1 = {
  ...result.times[day1],
  magrib: new Date(currentTime.setMinutes(currentTime.getMinutes() + 1)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  isha: new Date(currentTime.setMinutes(currentTime.getMinutes() + 1)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
}

const updatedDay2 = {
  ...result.times[day2],
  fajr: new Date(currentTime.setMinutes(currentTime.getMinutes() + 1)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  sunrise: new Date(currentTime.setMinutes(currentTime.getMinutes() + 1)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  dhuhr: new Date(currentTime.setMinutes(currentTime.getMinutes() + 1)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  asr: new Date(currentTime.setMinutes(currentTime.getMinutes() + 1)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  magrib: new Date(currentTime.setMinutes(currentTime.getMinutes() + 1)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  isha: new Date(currentTime.setMinutes(currentTime.getMinutes() + 1)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
}


result.times[day1] = updatedDay1;
result.times[day2] = updatedDay2;

const final = { result, updatedAt: 2023 };

const copyToClipboard = async (text) => {
  try {
    const { default: clipboardy } = await import('clipboardy');
    await clipboardy.write(text);
    console.log('Text copied to clipboard!');
  } catch (error) {
    console.error('Error copying text to clipboard:', error);
  }
};

copyToClipboard(JSON.stringify(final));
console.log(final);
