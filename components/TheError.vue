<template>
  <div class="component">
    <div class="error">
      <p class="error--heading">Oh no!</p>
      <p class="error--subheading">
        Something went wrong <br />
        Please close and open the app
      </p>

      <img class="error--mosque" src="../assets/mosque.svg" alt="Icon of a mosque" />

      <button @click="bob">close</button>
    </div>
  </div>
</template>

<script setup>
const bob = () => {
  console.log("eeee");
  window.close();
};
</script>

<style lang="postcss" scoped>
.component {
  @apply absolute grid h-full w-full top-0 left-0 justify-items-center items-center;
}

.error {
  @apply grid grid-flow-row justify-items-center;

  &--mosque {
    filter: drop-shadow(0 2px 3px hsla(263, 99%, 65%, 0.5));
    @apply w-16 mr-4 pointer-events-none;
  }

  &--heading {
    @apply text-2xl font-bold mb-4;
  }

  &--subheading {
    @apply text-xl mb-16 text-center;
  }
}
</style>
