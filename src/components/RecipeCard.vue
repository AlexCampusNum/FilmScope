<script setup>
import { useRouter} from "vue-router";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { computed } from "vue";

const router = useRouter();
const favoriteStore = useFavoriteStore();

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
    default: () => ({ id: 0, title: '', poster_url: '' })
  }
})

const isRecipeFavorite = computed(() => favoriteStore.isFavorite(props.recipe.id));

function toggleFavorite(event) {
  if (isRecipeFavorite.value) {
    favoriteStore.removeFavorite(props.recipe.id);
  } else {
    favoriteStore.addFavorite(props.recipe);
  }
}

function goToRecipeDetail() {
  router.push(`/recipe/${props.recipe.id}`);
}
</script>

<template>
  <div class="recipe-card" @click="goToRecipeDetail">
    <div class="recipe-poster">
      <img :src="recipe.poster_url" :alt="recipe.title" />
    </div>
    <h3 class="recipe-title">{{ recipe.title }}</h3>
    <div class="recipe-rating">
      <button @click.stop="toggleFavorite" class="favorite-button" :class="{ 'is-favorite': isRecipeFavorite}">
        {{ isRecipeFavorite ? '♥' : '♡' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
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

.recipe-card:hover {
  transform: translateY(-0.5rem);
}

.recipe-poster {
  width: 100%;
  margin-bottom: 1rem;
}

.recipe-poster img {
  width: 100%;
  height: auto;
  max-height: 30vh;
  object-fit: contain;
  border-radius: 0.3rem;
}

.recipe-title {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin: 0.5rem 0;
  color: #333;
  font-weight: 600;
}

.recipe-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 0.5rem;
  width: 100%;
}

.favorite-button {
  background: none;
  border: none;
  font-size: clamp(1rem, 2vw, 1.3rem);
  cursor: pointer;
  color: #ccc;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
}

.favorite-button.is-favorite {
  color: #ff0000;
}

.favorite-button:hover {
  transform: scale(1.2);
}
</style>