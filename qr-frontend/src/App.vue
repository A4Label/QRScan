<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <TopBar />
    </div>
  </header>
  <RouterView />
</template>
