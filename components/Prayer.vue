<template>
  <div class="prayer" :class="{ passed: prayer.passed, isNext: prayer.isNext, selected }" ref="prayerRef">
    <p class="prayer__item prayer__item--english">{{ prayer.english }}</p>
    <p class="prayer__item prayer__item--time">{{ prayer.time }}</p>
    <p class="prayer__item prayer__item--arabic">{{ prayer.arabic }}</p>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useTippy } from "vue-tippy/composition";

import { TimerController } from "!controllers/Timer";
import { IPrayerItem, usePrayerStore } from "!stores/prayers";

const { prayer } = defineProps({ prayer: Object as PropType<IPrayerItem> });

const prayerStore = usePrayerStore();
const isShowable = prayer.index > prayerStore.nextPrayerIndex;

const selected = ref(false);

const timeLeft = computed(() => {
  const prayerTimeMS = TimerController.convert24hrToMillisecond(prayer.time.replace(" ", ":"));
  const remainder = prayerTimeMS - new Date().getTime();
  return TimerController.timeLeft(remainder);
});

const prayerRef = ref(null);
const tippyConfig = {
  content: "Reactive options!",
  arrow: true,
  arrowType: "round",
  size: "large",
  trigger: "click",
  distance: 3,
  theme: "custom",
  animateFill: true,
  onHide() {
    selected.value = false;
  },
  onShow() {
    selected.value = true;
  }
};

useTippy(prayerRef, tippyConfig);
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
