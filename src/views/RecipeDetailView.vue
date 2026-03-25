<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const recipe = ref(null);

async function fetchRecipeDetails() {
  try {
    const baseUrl = import.meta.env.VITE_MEALDB_BASE_URL;
    const endpoint = import.meta.env.VITE_MEALDB_LOOKUP_ENDPOINT;

    const response = await axios.get(
        `${baseUrl}${endpoint}?i=${route.params.id}`
    );
    if (response.data.meals) {
      recipe.value = response.data.meals[0];
      recipe.value.ingredients = getIngredients(recipe.value);
    }
  } catch (error) {
    console.error("Erreur :", error);
  }
}

function getIngredients(recipe) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }
  return ingredients;
}

function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match ? match[2] : null;
}

onMounted(fetchRecipeDetails);
</script>

<template>
  <div v-if="recipe" class="recipe-detail">
    <h1>{{ recipe.strMeal }}</h1>
    <div class="recipe-poster">
      <img :src="recipe.strMealThumb" :alt="recipe.strMeal" />
    </div>
    <p class="recipe-category">Catégorie : {{ recipe.strCategory }}</p>
    <p class="recipe-area">Origine : {{ recipe.strArea }}</p>

    <div v-if="recipe.strYoutube" class="recipe-video">
      <h2>La recette en image</h2>
      <div class="video-container">
        <iframe
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${extractYouTubeId(recipe.strYoutube)}`"
            allowfullscreen
        >
        </iframe>
      </div>
    </div>

    <div class="ingredients-section">
      <h2>Ingrédients</h2>
      <ul class="ingredients-list">
        <li v-for="(item, index) in recipe.ingredients" :key="index">
          {{ item.ingredient }} : {{ item.measure }}
        </li>
      </ul>
    </div>

    <div class="instructions-section">
      <h2>Instructions</h2>
      <p class="recipe-instructions">{{ recipe.strInstructions }}</p>
    </div>
  </div>
  <div v-else>
    <p>Recette non trouvée.</p>
  </div>
</template>


<style scoped>
.recipe-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.recipe-poster img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

.ingredients-section {
  text-align: left;
  margin-top: 2rem;
}

.ingredients-list {
  list-style-type: none;
  padding: 0;
}

.ingredients-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  font-size: 1.1rem;
}

.instructions-section {
  text-align: left;
  margin-top: 2rem;
}

.recipe-instructions {
  font-size: 1.2rem;
  line-height: 1.6;
  white-space: pre-line;
}

.recipe-video {
  margin: 2rem 0;
  text-align: center;
}

.video-container {
  margin: 1rem auto;
  max-width: 560px;
  width: 100%;
}

.video-container iframe {
  width: 100%;
  height: 315px;
  border: none;
  border-radius: 8px;
}
</style>

