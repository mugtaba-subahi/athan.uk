<template>
  <TheSpinner v-if="isLoading" />
  <TheError v-else-if="hasError" />
  <div v-else>
    <Timer />
    <TheDate class="heading" v-once />
    <Prayer v-for="prayer in prayers" :prayer="prayer" />
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

.tippy-tooltip.custom-theme {
  @apply text-white bg-black py-4 px-6;
}

.tippy-roundarrow {
  @apply fill-black;
}
</style>

<style lang="postcss" scoped>
.heading {
  @apply mb-8;
}
</style>
