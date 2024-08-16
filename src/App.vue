<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <div class="wrapper"></div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
}

div {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  max-width: 100%;
}
</style>
