<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from "./Header/index.vue";
</script>

<template>
  <Header />
  <main class="container">
    <slot />
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  padding-top: 43px;
}
</style>
