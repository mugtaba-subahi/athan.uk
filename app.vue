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

const Store = useStore();
const { prayers } = storeToRefs(Store);

let isLoading = ref(true);
let hasError = ref(false);

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
