<script lang="ts" setup>
console.log("111LOL1");
navigator.serviceWorker.register("/sw.js", { scope: "/" });
console.log("222DONE REGS?");
</script>
