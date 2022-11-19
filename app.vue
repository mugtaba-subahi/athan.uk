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
const { prayers, isLoading, hasError, nextPrayerIndex, allPrayersPassed } = storeToRefs(Store);

await new PrayerController(Store).init();

isLoading.value = false;

// Loop logic onLoad
allPrayersPassed.value = prayers.value[5].passed;
allPrayersPassed.value && new TimerController(Store, nextPrayerIndex.value).loopUntilMidnight();

// watch - for when application is left open (otherwise wont refresh at midnight)
watch(allPrayersPassed, (shouldLoop) => {
  shouldLoop && new TimerController(Store, nextPrayerIndex.value).loopUntilMidnight();
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
