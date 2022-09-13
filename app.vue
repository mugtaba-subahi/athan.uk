<template>
  <TheSpinner v-if="isLoading" />
  <TheError v-else-if="hasError" />
  <div v-else>
    <Timer />
    <TheDate class="heading" v-once />
    <Prayer v-for="prayer in Store.prayers" :prayer="prayer" />
  </div>
</template>

<script lang="ts" setup>
import useStore from "!stores";
import { PrayerController } from "!controllers/Prayer";

const Store = useStore();

let isLoading = ref(true);
let hasError = ref(false);

const PrayerCon = new PrayerController(Store);

try {
  const apiResult = await PrayerController.fetchPrayers();

  PrayerCon.setApiResult(apiResult);
  PrayerCon.setNextPrayerIndex();

  isLoading.value = false;
} catch (error) {
  isLoading.value = false;
  hasError.value = true;
}
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
  background-color: black;
  color: white;
  padding: 15px 20px;
}

.tippy-roundarrow {
  fill: black;
}
</style>

<style lang="postcss" scoped>
.heading {
  @apply mb-8;
}
</style>
