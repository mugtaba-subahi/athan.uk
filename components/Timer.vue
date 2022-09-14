<template>
  <div class="timer">
    <template v-if="nextPrayerIndex !== -1">
      <p class="timer__item">{{ prayers[nextPrayerIndex].english }} in</p>
      <p class="timer__item timer--time">{{ prayers[nextPrayerIndex].timeLeft }}</p>
    </template>
    <template v-else>
      <p class="timer__item timer--finished">All prayers passed</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import useStore from "!stores";

const Store = useStore();
const { prayers, nextPrayerIndex } = storeToRefs(Store);
</script>

<style lang="postcss" scoped>
.timer {
  @apply mb-8 grid justify-items-center h-12;

  &__item {
    @apply opacity-50 text-sm;
  }

  &--time {
    @apply opacity-100 text-2xl;
  }

  &--finished {
    @apply self-center;
  }
}
</style>
