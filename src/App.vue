<script setup lang="ts">
import OneLevelHeader from './components/OneLevelHeader/index.vue'
import FooterMultiColumn from './components/FooterMultiColumn/index.vue'
</script>

<template>
  <OneLevelHeader />
  <div class="app-wrapper">
    <router-view />
  </div>
  <FooterMultiColumn />
</template>

<style lang ="scss">
@import "./assets/scss/palette-colors.scss";
@import "./assets/scss/responsive-layout.scss";
</style>