<script setup>
import { ref } from 'vue';

const searchTerm = ref('');
const emit = defineEmits(['search']);

function handleInput() {
  emit('search', searchTerm.value);
}

function resetSearch() {
  searchTerm.value = '';
  emit('search', searchTerm.value);
}
</script>

<template>
  <div class="search-bar">
    <input
        v-model="searchTerm"
        @input="handleInput"
        type="text"
        placeholder="Rechercher des recettes..."
    />
    <button @click="resetSearch" class="reset-button">✕</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
}

input {
  padding: 0.5rem;
  flex-grow: 1;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.reset-button {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.reset-button:hover {
  background: #e0e0e0;
}
</style>