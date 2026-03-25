<script setup>
import { ref } from 'vue';
import RecipeList from '@/components/RecipeList.vue';

const searchTerm = ref('');
</script>

<template>
  <div class="home">
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
