<template>
  <div class="container">
    <TheSpinner v-if="isLoading" />
    <TheError v-else-if="hasError" />
    <div v-else>
      <Timer />
      <TheDate class="date" v-once />
      <Prayer v-for="prayer in prayers" :prayer="prayer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import useStore from "!stores";
import { PrayerController } from "!controllers/Prayer";
import { TimerController } from "!controllers/Timer";

const Store = useStore();
const { prayers, nextPrayerIndex } = storeToRefs(Store);

const isLoading = ref(true);
const hasError = ref(false);

onMounted(async () => {
  const PrayerCon = new PrayerController(Store);

  const [apiResult, error] = await PrayerController.fetchPrayers()
    .then((result) => [result, null])
    .catch((error) => [null, error]);

  if (error) {
    console.log(error);
    isLoading.value = false;
    hasError.value = true;
    return;
  }

  PrayerCon.setApiResult(apiResult);
  PrayerCon.setNextPrayerIndex();

  isLoading.value = false;

  // loop onLoad
  const allPrayersPassed = prayers.value[prayers.value.length - 1].passed;
  allPrayersPassed && new TimerController(Store, nextPrayerIndex.value).startMidnightTimeout();

  // TESTING BELOW
  //
  //
  //
  //
  //
  //
  //
  //

  let counter = 0;
  const wait = 60_000;

  await Notification.requestPermission();
  setInterval(() => {
    console.log({ counter });
    new Notification(`Hi, How are you? ${counter}`, { tag: "athan" });
    alert({ counter });
    counter++;
  }, 5000);
});
</script>

<style lang="postcss">
* {
  -webkit-tap-highlight-color: transparent;
}

html,
body {
  @apply h-full;
}

body {
  @apply font-['Roboto'] grid text-white select-none p-4 bg-gradient-to-b from-midnight to-aurora;
  @apply sm:justify-items-center;
}

.tippy-tooltip.custom-theme {
  box-shadow: rgba(3, 27, 75, 0.5) 0px 2px 8px 0px;
  @apply text-white bg-black py-4 px-6;
}

.tippy-tooltip.custom-theme > .tippy-roundarrow {
  @apply fill-black;
}
</style>

<style lang="postcss" scoped>
.container {
  @apply sm:min-w-[630px];
}

.date {
  @apply mb-8;
}
</style>
