<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const meal = ref(null);

function getIngredients(mealData) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }
  return ingredients;
}

async function fetchMealDetails() {
  try {
    const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`
    );
    if (response.data.meals) {
      meal.value = response.data.meals[0];
      meal.value.ingredients = getIngredients(meal.value);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la recette :", error);
  }
}

onMounted(fetchMealDetails);
</script>

<template>
  <div v-if="meal" class="pasta-detail">
    <h1>{{ meal.strMeal }}</h1>
    <div class="pasta-poster">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" />
    </div>
    <p class="pasta-category">Catégorie : {{ meal.strCategory }}</p>
    <p class="pasta-area">Origine : {{ meal.strArea }}</p>

    <div class="ingredients-section">
      <h2>Ingrédients</h2>
      <ul class="ingredients-list">
        <li v-for="(item, index) in meal.ingredients" :key="index">
          {{ item.ingredient }} : {{ item.measure }}
        </li>
      </ul>
    </div>

    <div class="instructions-section">
      <h2>Instructions</h2>
      <p class="pasta-instructions">{{ meal.strInstructions }}</p>
    </div>
  </div>
  <div v-else>
    <p>Recette non trouvée.</p>
  </div>
</template>


<style scoped>
.pasta-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.pasta-poster img {
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

.pasta-instructions {
  font-size: 1.2rem;
  line-height: 1.6;
  white-space: pre-line;
}
</style>

