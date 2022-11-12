<script setup>
defineProps({
  type: String,
});
</script>

<template>
  <button
    class="font-bold disabled:opacity-20"
    :class="
      type === 'primary'
        ? 'bg-blue text-white'
        : type === 'secondary'
        ? 'bg-background text-black'
        : type === 'danger' && 'bg-red text-white'
    "
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
