<template>
  <div class="component">
    <div class="error">
      <p class="error--heading">Oh no!</p>
      <p class="error--subheading">
        Something went wrong. <br />
        We are investigating!
      </p>
      <img class="error--mosque" src="../assets/mosque.svg" alt="Icon of a mosque" />
      <button class="close" @click="forceAppRefresh">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="close--icon">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Refresh
      </button>
    </div>
  </div>
</template>

<script setup>
import { forceAppRefresh } from "!utils/application";

// Refresh in 10 seconds if user doesnt click refresh
setTimeout(() => forceAppRefresh(), 10_000);
</script>

<style lang="postcss" scoped>
.component {
  @apply absolute grid h-full w-full top-0 left-0 justify-items-center items-center;
}

.error {
  @apply grid grid-flow-row justify-items-center;

  &--mosque {
    filter: drop-shadow(0 2px 3px hsla(263, 99%, 65%, 0.5));
    @apply w-16 mr-4 mb-16 pointer-events-none;
  }

  &--heading {
    @apply text-2xl font-bold mb-4;
  }

  &--subheading {
    @apply text-xl mb-16 text-center leading-8;
  }
}

.close {
  @apply inline-flex rounded-md bg-white px-8 py-3 text-base shadow-lg bg-black/60 text-white duration-200 hover:bg-black/80;

  &--icon {
    @apply w-5 h-5 mr-3 self-center;
  }
}
</style>
