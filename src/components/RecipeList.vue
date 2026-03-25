<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import RecipeCard from "@/components/RecipeCard.vue";
import SearchBar from "@/components/SearchBar.vue";

const props = defineProps({
  search: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update-search']);

const recipes = ref([]);

async function fetchRecipes() {
  try {
    const meals = [];
    const baseUrl = import.meta.env.VITE_MEALDB_BASE_URL;
    const endpoint = import.meta.env.VITE_MEALDB_RANDOM_ENDPOINT;

    for (let i = 0; i < 20; i++) {
      const response = await axios.get(`${baseUrl}${endpoint}`);
      if (response.data.meals) {
        meals.push(response.data.meals[0]);
      }
    }
    recipes.value = meals;
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// Appeler la fonction au chargement du composant
onMounted(fetchRecipes);

function handleAddFavorite(recipe) {
  console.log('Recette ajoutée aux favoris :', recipe.strMeal);
}

function updateSearch(term) {
  emit('update-search', term);
}

// Filtrer les recettes en fonction de la recherche
const filteredRecipes = computed(() => {
  const term = props.search.trim().toLowerCase();
  if (!term) return recipes.value;
  return recipes.value.filter(recipe =>
      recipe.strMeal.toLowerCase().includes(term)
  );
});

const resultCount = computed(() => filteredRecipes.value.length);

function formatRecipe(recipe) {
  return {
    id: recipe.idMeal,
    title: recipe.strMeal,
    poster_url: recipe.strMealThumb
  };
}

</script>

<template>
  <div class="app">
    <SearchBar @search="updateSearch" />
    <p>{{ resultCount }} résultat(s)</p>
    <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.idMeal"
        :recipe="formatRecipe(recipe)"
        @add-favorite="handleAddFavorite"
    />
  </div>
</template>

<style scoped>
.app {
  padding: 1rem;
  max-width: 40vw;
  margin: 0 auto;
}
</style>