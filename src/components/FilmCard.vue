<script setup>
import { useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  film: {
    type: Object,
    required: true,
    default: () => ({ id: 0, title: '', year: 0, poster_url: '', note: 0 })
  }
})

const emit = defineEmits(['add-favorite']);

function addToFavorites() {
  emit('add-favorite', props.film);
}

function goToFilmDetail() {
  router.push(`/film/${props.film.id}`);
}
</script>

<template>
  <div class="film-card" @click="goToFilmDetail">
    <div class="film-poster">
      <img :src="film.poster_url" :alt="film.title" />
    </div>

    <h3 class="film-title">{{ film.title }}</h3>

    <p class="film-year">{{ film.year }}</p>

    <div class="film-rating">
      <p class="film-note">Note : {{ film.note }}/5</p>
      <button @click="addToFavorites" class="favorite-button">♥</button>
    </div>
  </div>
</template>

<style scoped>
.film-card {
  width: clamp(15vw, 200px, 30vw);
  max-width: 90%;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.film-card:hover {
  transform: translateY(-0.5rem);
}

.film-poster {
  width: 100%;
  margin-bottom: 1rem;
}

.film-poster img {
  width: 100%;
  height: auto;
  max-height: 30vh;
  object-fit: contain;
  border-radius: 0.3rem;
}

.film-title {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin: 0.5rem 0;
  color: #333;
  font-weight: 600;
}

.film-year {
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  color: #666;
  margin: 0.3rem 0;
}

.film-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 0.5rem;
  width: 100%;
}

.film-note {
  margin: 0;
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  color: #555;
}

.favorite-button {
  background: none;
  border: none;
  font-size: clamp(1rem, 2vw, 1.3rem);
  cursor: pointer;
  color: #ff6b6b;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
}

.favorite-button:hover {
  color: #ff0000;
  transform: scale(1.2);
}
</style>