<template>
  <section class="heading">
    <p class="heading--location">London, UK</p>
    <p class="heading--date">{{ date }}</p>
    <img class="heading--mosque" src="../assets/mosque.svg" alt="Icon of a mosque" />
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import useStore from "!stores";

const Store = useStore();
const { dayOfMonth } = storeToRefs(Store);

const dateConfig: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
};

let date = ref(new Date().toLocaleString("en-GB", dateConfig));

// watch - for when application is left open (otherwise wont refresh at midnight)
watch(dayOfMonth, () => {
  date.value = new Date().toLocaleString("en-GB", dateConfig);
});
</script>

<style lang="postcss" scoped>
.heading {
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "location  mosque"
    "date      mosque";

  @apply grid;

  &--location {
    grid-area: location;
    @apply opacity-50 tracking-wide;
  }
  &--date {
    @apply text-lg leading-6;
  }

  &--mosque {
    grid-area: mosque;
    filter: drop-shadow(0 2px 3px hsla(263, 99%, 65%, 0.3));
    @apply w-12 pointer-events-none;
  }
}
</style>
