<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <Error v-else-if="hasError" />
    <main v-else  class="main">
      <Timer />
      <Date class="main__date" v-once />
      <span>
        <Prayer v-for="index in 6" :prayerIndex="index-1" />
      </span>
      <Footer />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import useStore from "!stores";
import { PrayerController } from "!controllers/Prayer";
import { loopUntilMidnight } from "!utils/time";
import { logAppVersion, forceAppRefresh } from "!utils/application";

const Store = useStore();
const { prayers } = storeToRefs(Store);

const isLoading = ref(true);
const hasError = ref(false);

const init = async () => {
  try {
    await new PrayerController(Store).init();

    isLoading.value = false;

    // start midnight loop if all prayers passed
    prayers.value[prayers.value.length - 1].passed && loopUntilMidnight();
  } catch (error) {
    console.error(error);
    
    isLoading.value = false;
    hasError.value = true;
  }
}

onMounted(async () => {
  logAppVersion();
  await init();
});
</script>

<style lang="postcss">
* {
  -webkit-tap-highlight-color: transparent;
}

html,
body,
#__nuxt {
  @apply h-full;
}

body {
  @apply font-['Roboto'] text-white select-none p-4 bg-gradient-to-b from-midnight to-aurora;
}

.tippy-box {
  box-shadow: rgba(3, 27, 75, 0.5) 0px 2px 8px 0px;
  @apply text-white bg-black py-3 px-5 text-base;
}

.tippy-arrow {
  /* @apply bg-black text-black; */
  color: black !important;
  background-color: black !important;
}
</style>

<style lang="postcss" scoped>
.container {
  @apply grid min-w-full h-full;
}

.main {
  @apply grid;
  @apply sm:min-w-[500px] sm:justify-self-center;

  grid-template-rows: min-content min-content 1fr min-content;

  &__date {
    @apply mb-8;
  }
}
</style>
