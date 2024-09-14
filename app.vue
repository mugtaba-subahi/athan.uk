<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <Error v-else-if="hasError" />
    <div v-else>
      <Timer />
      <Date class="date" v-once />
      <Prayer v-for="index in 6" :prayerIndex="index-1" />
    </div>
    <Footer v-if="!isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import useStore from "!stores";
import { PrayerController } from "!controllers/Prayer";
import { loopUntilMidnight } from "!utils/time";
import { appIsOutdated } from "!utils/version";
import { forceApplicationRefresh } from "!utils/application";

const Store = useStore();
const { prayers } = storeToRefs(Store);

const isLoading = ref(true);
const hasError = ref(false);

const init = async () => {
  await new PrayerController(Store).init().catch((error) => {
    console.error(error);
    isLoading.value = false;
    hasError.value = true;
    throw error;
  });

  isLoading.value = false;

  // start midnight loop if all prayers passed
  prayers.value[prayers.value.length - 1].passed && loopUntilMidnight();
}

onMounted(async () => {
  // if (appIsOutdated()) await forceApplicationRefresh();
  await init();
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

.tippy-box {
  box-shadow: rgba(3, 27, 75, 0.5) 0px 2px 8px 0px;
  @apply text-white bg-black py-3 px-5 text-base;
}

.tippy-arrow {
  @apply bg-black text-black;
}
</style>

<style lang="postcss" scoped>
.container {
  @apply sm:min-w-[630px] grid h-full;
}

.date {
  @apply mb-8;
}
</style>
