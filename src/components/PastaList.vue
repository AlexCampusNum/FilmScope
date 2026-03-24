<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import PastaCard from "@/components/PastaCard.vue";
import SearchBar from "@/components/SearchBar.vue";

const props = defineProps({
  search: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update-search']);

const meals = ref([]);

async function fetchPastaMeals() {
  try {
    const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta'
    );
    meals.value = response.data.meals || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes :", error);
  }
}

// Appeler la fonction au chargement du composant
onMounted(fetchPastaMeals);

function handleAddFavorite(meal) {
  console.log('Recette ajoutée aux favoris :', meal.strMeal);
}

function updateSearch(term) {
  emit('update-search', term);
}

// Filtrer les recettes en fonction de la recherche
const filteredMeals = computed(() => {
  const term = props.search.trim().toLowerCase();
  if (!term) return meals.value;
  return meals.value.filter(meal =>
      meal.strMeal.toLowerCase().includes(term)
  );
});

const resultCount = computed(() => filteredMeals.value.length);

function formatMealToPasta(meal) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    poster_url: meal.strMealThumb,
    description: meal.strInstructions || "Aucune description disponible."
  };
}

</script>

<template>
  <div class="app">
    <h1>Liste des recettes de pâtes</h1>
    <SearchBar @search="updateSearch" />
    <p>{{ resultCount }} résultat(s)</p>
    <PastaCard
        v-for="meal in filteredMeals"
        :key="meal.idMeal"
        :pasta="formatMealToPasta(meal)"
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