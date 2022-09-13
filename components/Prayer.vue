<template>
  <div class="prayer" :class="{ passed: prayer.passed, isNext, selected }" ref="prayerRef">
    <p class="prayer__item prayer__item--english">{{ prayer.english }}</p>
    <p class="prayer__item prayer__item--time">{{ prayer.time }}</p>
    <p class="prayer__item prayer__item--arabic">{{ prayer.arabic }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useTippy } from "vue-tippy/composition";

import { TimerController } from "!controllers/Timer";
import useStore, { IPrayerItem } from "!stores";

const { prayer } = defineProps<{ prayer: IPrayerItem }>();

const Store = useStore();

const isNext = computed(() => prayer.index === Store.nextPrayerIndex);
const selected = ref(false);
const prayerRef = ref(null);

const options = {
  content: computed(() => prayer.timeLeft),
  arrow: true,
  arrowType: "round",
  size: "large",
  trigger: "click",
  distance: 3,
  theme: "custom",
  onHide() {
    selected.value = false;
  },
  onShow() {
    selected.value = true;
  }
};

!prayer.passed && new TimerController(Store, prayer.index).start();
!prayer.passed && prayer.index !== Store.nextPrayerIndex && useTippy(prayerRef, options);
</script>

<style lang="postcss" scoped>
.prayer {
  @apply grid grid-cols-3 justify-items-center text-lg rounded px-5 opacity-50 duration-300 mb-1;

  &__item {
    @apply py-3 justify-items-center;

    &--english {
      @apply justify-self-start;
    }

    &--arabic {
      @apply justify-self-end leading-6 text-xl;
    }
  }
}

.isNext,
.passed {
  @apply opacity-100;
}

.isNext {
  background-color: #0d6cda;
}

.selected {
  background-color: rgba(0, 0, 0, 0.381);
  opacity: 1;
  color: white;
}
</style>
