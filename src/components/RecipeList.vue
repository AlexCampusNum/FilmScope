<script setup>
import { ref, computed, onMounted } from 'vue';
import mealdbService from '@/services/mealdbService';
import RecipeCard from "@/components/RecipeCard.vue";
import SearchBar from "@/components/SearchBar.vue";

const props = defineProps({
  search: { type: String, default: '' },
});
const emit = defineEmits(['update-search']);

// États pour la gestion des appels API
const recipes = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Récupérer les recettes aléatoires
async function fetchRandomMeals() {
  isLoading.value = true;
  error.value = null;
  try {
    const responses = [];
    // Récupérer 20 recettes aléatoires (1 par appel API)
    for (let i = 0; i < 20; i++) {
      const response = await mealdbService.getRandomMeals();
      responses.push(response.data.meals[0]);
    }
    recipes.value = responses;
  } catch (err) {
    error.value = err.message || "Erreur lors de la récupération des recettes.";
    console.error("Erreur API:", err);
  } finally {
    isLoading.value = false;
  }
}

// Rechercher des recettes
async function searchMeals(query) {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await mealdbService.searchMeals(query);
    recipes.value = response.data.meals || [];
  } catch (err) {
    error.value = err.message || "Aucune recette trouvée.";
    console.error("Erreur de recherche:", err);
  } finally {
    isLoading.value = false;
  }
}

// Filtrer les recettes (recherche locale)
const filteredRecipes = computed(() => {
  const term = props.search.trim().toLowerCase();
  if (!term) return recipes.value;
  return recipes.value.filter(recipe =>
      recipe.strMeal.toLowerCase().includes(term)
  );
});

// Appel initial au montage du composant
onMounted(fetchRandomMeals);

// Mettre à jour la recherche
function updateSearch(term) {
  emit('update-search', term);
  if (term.trim()) {
    searchMeals(term);
  } else {
    fetchRandomMeals(); // Recharger les recettes aléatoires si la recherche est vide
  }
}
</script>

<template>
  <div class="app">
    <h1>Liste des recettes</h1>
    <SearchBar @search="updateSearch" />

    <!-- Affichage du chargement -->
    <div v-if="isLoading" class="loading">
      <p>Chargement des recettes...</p>
    </div>

    <!-- Affichage des erreurs -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchRandomMeals">Réessayer</button>
    </div>

    <!-- Affichage des résultats -->
    <template v-else>
      <p>{{ filteredRecipes.length }} résultat(s)</p>
      <div v-if="filteredRecipes.length > 0" class="recipes-grid">
        <RecipeCard
            v-for="recipe in filteredRecipes"
            :key="recipe.idMeal"
            :recipe="{
            id: recipe.idMeal,
            title: recipe.strMeal,
            poster_url: recipe.strMealThumb,
            description: recipe.strInstructions,
          }"
        />
      </div>
      <p v-else>Aucune recette trouvée.</p>
    </template>
  </div>
</template>

<style scoped>
.app {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .error {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  margin: 1rem 0;
}

.error button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>