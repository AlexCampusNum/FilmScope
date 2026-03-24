<script setup>
const emit = defineEmits(['update-search']);

function handleInput(event) {
  emit('update-search', event.target.value);
}
</script>

<template>
  <input
      type="text"
      @input="handleInput"
      placeholder="Rechercher un film..."
  />
</template>

<style scoped>
input {
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
}
</style>