<template>
  <div class="timer">
    <template v-if="Store.nextPrayerIndex !== -1">
      <p class="timer__item">{{ Store.prayers[Store.nextPrayerIndex].english }} in</p>
      <p class="timer__item timer--time">{{ Store.prayers[Store.nextPrayerIndex].timeLeft }}</p>
    </template>
    <template v-else>
      <p class="timer__item">All prayers passed</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import useStore from "!stores";

const Store = useStore();
</script>

<style lang="postcss" scoped>
.timer {
  @apply mb-8 grid justify-items-center;

  &__item {
    @apply opacity-50 text-sm;
  }

  &--time {
    @apply opacity-100 text-2xl;
  }
}
</style>
