<script setup>
import { ref } from 'vue';
import RecipeList from '@/components/RecipeList.vue';

const searchTerm = ref('');

function updateSearch(term) {
  searchTerm.value = term;
}
</script>

<template>
  <div class="home">
    <h1>Liste des recettes</h1>
    <RecipeList :search="searchTerm" @update-search="updateSearch" />
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  max-width: 60vw;
  margin: 0 auto;
}
</style>
