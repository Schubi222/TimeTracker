<template>
  <RouterView />
  <div class="Background-Wrapper">
    <div class="Background-Wrapper__left-top Background-Wrapper__basic-top"></div>
    <div class="Background-Wrapper__right-top Background-Wrapper__basic-top"></div>

  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
@import "@/assets/styles/background.css";
</style>
