<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <nav class="flex items-center bg-blue">
    <div class="container mx-auto" data-cy="header-background">
      <h2 class="text-white font-bold uppercase" data-cy="header-title">
        TO DO LIST APP
      </h2>
    </div>
  </nav>
</template>

<style scoped>
nav {
  height: 105px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
}
</style>
