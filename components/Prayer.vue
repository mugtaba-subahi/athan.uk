<template>
  <div class="prayer" :class="{ passed: prayer.passed, isNext, selected }" ref="prayerRef">
    <p class="prayer__item prayer__item--english">{{ prayer.english }}</p>
    <p class="prayer__item prayer__item--time">{{ prayer.time }}</p>
    <p class="prayer__item prayer__item--arabic">{{ prayer.arabic }}</p>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTippy } from "vue-tippy/composition";
import { TimerController } from "!controllers/Timer";
import useStore, { IPrayerItem } from "!stores";

const { prayer } = defineProps<{ prayer: IPrayerItem }>();

const Store = useStore();
const { nextPrayerIndex } = storeToRefs(Store);

// cannot be ref otherwise wont be re-evaluated. only once on load
const isNext = computed(() => prayer.index === nextPrayerIndex.value);
const timeLeft = computed(() => prayer.timeLeft);

const selected = ref(false);
const prayerRef = ref(null);

const tippyTransitionMS = 400;
const options = {
  content: timeLeft,
  arrow: true,
  arrowType: "round",
  size: "large",
  trigger: "click",
  distance: 7,
  duration: tippyTransitionMS,
  inertia: true,
  theme: "custom",
  onHide() {
    selected.value = false;
  },
  onShow() {
    selected.value = true;
  }
};

let tippyInstance = null;

!prayer.passed && new TimerController(Store, prayer.index).start();
!prayer.passed && prayer.index !== nextPrayerIndex.value && (tippyInstance = useTippy(prayerRef, options));

watch(nextPrayerIndex, (newIndex) => {
  if (newIndex !== prayer.index) return;
  tippyInstance.tippy.value.hide();
  setTimeout(() => tippyInstance.tippy.value.destroy(), tippyTransitionMS);
});
</script>

<style lang="postcss" scoped>
.prayer {
  @apply grid grid-cols-3 justify-items-center text-lg rounded px-5 opacity-50 mb-1 transition-[background] duration-500 outline-none;

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
