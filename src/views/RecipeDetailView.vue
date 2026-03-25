<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import mealdbService from '@/services/mealdbService';

const route = useRoute();
const recipe = ref(null);
const isLoading = ref(false);
const error = ref(null);

async function fetchMealDetails() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await mealdbService.getMealDetails(route.params.id);
    recipe.value = response.data.meals[0];
  } catch (err) {
    error.value = err.message || "Recette non trouvée.";
    console.error("Erreur:", err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchMealDetails);
</script>

<template>
  <div class="recipe-detail">
    <!-- Affichage du chargement -->
    <div v-if="isLoading" class="loading">
      <p>Chargement de la recette...</p>
    </div>

    <!-- Affichage des erreurs -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <!-- Affichage de la recette -->
    <div v-else-if="recipe" class="recipe-content">
      <h1>{{ recipe.strMeal }}</h1>
      <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="recipe-image" />

      <!-- Vidéo YouTube (si disponible) -->
      <div v-if="recipe.strYoutube" class="recipe-video">
        <iframe
            :src="`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`"
            frameborder="0"
            allowfullscreen
        ></iframe>
      </div>

      <!-- Ingrédients -->
      <div class="ingredients-section">
        <h2>Ingrédients</h2>
        <ul class="ingredients-list">
          <li v-for="i in 20" :key="i">
            <template v-if="recipe[`strIngredient${i}`]">
              {{ recipe[`strIngredient${i}`] }} - {{ recipe[`strMeasure${i}`] }}
            </template>
          </li>
        </ul>
      </div>

      <!-- Instructions -->
      <div class="instructions-section">
        <h2>Instructions</h2>
        <p>{{ recipe.strInstructions }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.recipe-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.recipe-video {
  margin: 2rem 0;
  text-align: center;
}

.recipe-video iframe {
  width: 100%;
  max-width: 560px;
  height: 315px;
  border-radius: 8px;
}

.ingredients-section, .instructions-section {
  margin: 2rem 0;
  text-align: left;
}

.ingredients-list {
  list-style: none;
  padding: 0;
}

.ingredients-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>