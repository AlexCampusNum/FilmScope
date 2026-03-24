<script setup>
import { ref } from 'vue';
import PastaList from '@/components/PastaList.vue';

const searchTerm = ref('');

function updateSearch(term) {
  searchTerm.value = term;
}
</script>

<template>
  <PastaList :search="searchTerm" @update-search="updateSearch" />
</template>

<style scoped></style>
