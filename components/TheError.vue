<template>
  <div class="component">
    <div class="error">
      <p class="error--heading">Oh no!</p>
      <p class="error--subheading">Something went wrong</p>
      <img class="error--mosque" src="../assets/mosque.svg" alt="Icon of a mosque" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.component {
  @apply absolute grid h-full w-full top-0 left-0 justify-items-center items-center;
}

.error {
  @apply grid grid-flow-row justify-items-center;

  &--mosque {
    filter: drop-shadow(0 2px 3px hsla(0, 91%, 45%, 0.22));
    @apply w-16 mr-4 pointer-events-none;
  }

  &--heading {
    @apply text-2xl font-bold;
  }

  &--subheading {
    @apply text-xl mb-16;
  }
}
</style>
