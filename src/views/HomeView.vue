<script setup>
import { ref } from 'vue';
import FilmList from '@/components/FilmList.vue';

const searchTerm = ref('');

function updateSearch(term) {
  searchTerm.value = term;
}
</script>

<template>
  <FilmList :search="searchTerm" @update-search="updateSearch" />
</template>

<style scoped></style>
