<template>
  <TheSpinner v-if="isLoading" />
  <TheError v-else-if="hasError" />
  <div v-else>
    <Timer :nextPrayer="prayerStore.prayers[prayerStore.nextPrayerIndex] || null" :timeLeft="timerStore.nextPrayerTimeLeft" />
    <TheDate class="heading" v-once />
    <Prayer v-for="(prayer, i) in prayerStore.prayers" :key="i" :prayer="prayer" />
  </div>
</template>

<script lang="ts" setup>
// test 5
import { storeToRefs } from "pinia";

import * as ServiceWorker from "@/public/serviceWorker";
import { usePrayerStore } from "!stores/prayers";
import { useTimerStore } from "!stores/timer";
import { PrayerController } from "!controllers/Prayer";
import { TimerController } from "!controllers/Timer";

const prayerStore = usePrayerStore();
const timerStore = useTimerStore();
const { finished } = storeToRefs(timerStore);

let isLoading = ref(true);
let hasError = ref(false);

const PrayerCon = new PrayerController(prayerStore);
const TimerCon = new TimerController(timerStore);

try {
  const apiResult = await PrayerController.fetchPrayers();

  // handle prayers on load
  PrayerCon.setApiResult(apiResult);
  PrayerCon.setNextPrayer();

  // handle timer on load
  TimerCon.start(prayerStore.prayers, prayerStore.nextPrayerIndex);

  isLoading.value = false;
} catch (error) {
  isLoading.value = false;
  hasError.value = true;
}

// handle timer on finish
watch(finished, (isFinished) => {
  if (!isFinished) return;

  PrayerCon.setPreviousPrayer();
  PrayerCon.setNextPrayer();

  TimerCon.start(prayerStore.prayers, prayerStore.nextPrayerIndex);
});

onMounted(() => ServiceWorker.register());
</script>

<style lang="postcss">
@tailwind base;

html,
body {
  @apply h-full;
}

body {
  font-family: "Roboto";
  background: linear-gradient(#031b4b, #660ca1);
  @apply text-white select-none p-4;
}
</style>

<style lang="postcss" scoped>
.heading {
  @apply mb-8;
}
</style>
