<template>
  <div class="prayer" :class="{ passed: prayers[prayerIndex].passed, isNext, selected }" ref="prayerRef">
    <p class="prayer__item prayer__item--english">{{ prayers[prayerIndex].english }}</p>
    <p class="prayer__item prayer__item--time">{{ prayers[prayerIndex].time }}</p>
    <p class="prayer__item prayer__item--arabic">{{ prayers[prayerIndex].arabic }}</p>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTippy } from 'vue-tippy'
import { TimerController } from "!controllers/Timer";
import useStore from "!stores";

import "tippy.js/dist/tippy.css";
import 'tippy.js/animations/shift-away-subtle.css'

const { prayerIndex } = defineProps<{ prayerIndex: number }>();

const Store = useStore();
const { prayers, nextPrayerIndex, prayersDate } = storeToRefs(Store);

// cannot be ref otherwise wont be re-evaluated. only once on load
const isNext = computed(() => prayerIndex === nextPrayerIndex.value);
const timeLeft = computed(() => prayers.value[prayerIndex].timeLeft);

const selected = ref(false);
const prayerRef = ref();

let tippyInstance = useTippy(prayerRef, {
  content: timeLeft,
  arrow: true,
  trigger: "click",
  duration: 400,
  inertia: true,
  animation: "shift-away-subtle",
  onHide() { selected.value = false },
  onShow() { selected.value = true }
});

if(!prayers.value[prayerIndex].passed) new TimerController(Store, prayerIndex).start();

onMounted(() => {
  tippyInstance.disable()
  if(!prayers.value[prayerIndex].passed && prayerIndex > nextPrayerIndex.value) tippyInstance.enable();
});

onUpdated(() => {
  if(prayers.value[prayerIndex].passed || prayerIndex == nextPrayerIndex.value) tippyInstance.disable();
});

watch(prayersDate, () => {
  new TimerController(Store, prayerIndex).start();
  if(!prayers.value[prayerIndex].passed && prayerIndex > nextPrayerIndex.value) tippyInstance.enable();
});
</script>

<style lang="postcss" scoped>
.prayer {
  @apply grid grid-cols-3 justify-items-center text-lg rounded px-5 opacity-50 mb-1 transition-[background] duration-[400ms] outline-none;

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

.prayer:not(.passed) + :not(:first-child):hover {
  @apply cursor-pointer;
}

.isNext {
  @apply drop-shadow-xl bg-ocean;
}

.selected {
  @apply bg-black/40 text-white;
}

.isNext,
.passed,
.selected {
  @apply opacity-100;
}
</style>
