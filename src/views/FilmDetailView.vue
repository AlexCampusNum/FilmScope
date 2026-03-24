<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const film = ref(null);



onMounted(() => {
  const filmId = parseInt(route.params.id);
  film.value = films.find(f => f.id === filmId);
});
</script>

<template>
  <div v-if="film" class="film-detail">
    <h1>{{ film.title }}</h1>
    <div class="film-poster">
      <img :src="film.poster_url" :alt="film.title" />
    </div>
    <p class="film-year">Année : {{ film.year }}</p>
    <p class="film-note">Note : {{ film.note }}/5</p>
    <p class="film-description">{{ film.description }}</p>
  </div>
  <div v-else>
    <p>Film non trouvé.</p>
  </div>
</template>

<style scoped>
.film-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.film-poster img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

.film-description {
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>
