<script setup>
defineProps({
  type: String,
});
</script>

<template>
  <button
    class="font-bold text-white"
    :class="type === 'primary' ? 'bg-blue' : ''"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  font-size: 18px;
  line-height: 27px;
  display: flex;
  width: 159px;
  height: 54px;
  border-radius: 9999px;
  border: none;
  justify-content: center;
  align-items: center;
  gap: 6px;
}
</style>
