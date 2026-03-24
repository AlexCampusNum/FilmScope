<script setup>
import { ref, computed } from 'vue'
import FilmCard from "@/components/FilmCard.vue";
import SearchBar from "@/components/SearchBar.vue";

const search = ref('')

const films = [
  {
    id: 1,
    title: 'Kung Fury',
    year: 2015,
    poster_url: '/assets/kung fury.jpg',
    note: 4.1
  },
  {
    id: 2,
    title: 'Le parrain',
    year: 1972,
    poster_url: '/assets/Le parrain.jpg',
    note: 5
  },
  {
    id: 3,
    title: 'Las vegas parano',
    year: 1998,
    poster_url: '/assets/Las vegas parano.jpg',
    note: 4.6
  }
]

function handleAddFavorite(film) {
  console.log('Film ajouté aux favoris :', film.title);
}

function updateSearch(term) {
  search.value = term;
}

const filteredFilms = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) {
    return films
  }
  return films.filter(film =>
      film.title.toLowerCase().includes(term)
  )
})

const resultCount = computed(() => filteredFilms.value.length)
</script>

<template>
  <div class="app">
    <h1>Liste des films</h1>
    <SearchBar @update-search="updateSearch" />
    <p>{{ resultCount }} résultat(s)</p>

    <FilmCard
        v-for="film in filteredFilms"
        :key="film.id"
        :film="film"
        @add-favorite="handleAddFavorite"
    />
  </div>
</template>

<style scoped>
.app {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}
</style>