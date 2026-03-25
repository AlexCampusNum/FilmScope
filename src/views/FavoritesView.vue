<script setup>
import { useFavoriteStore } from "@/stores/favoriteStore";
import RecipeCard from "@/components/RecipeCard.vue";

const favoriteStore = useFavoriteStore();
</script>

<template>
  <div class="favorites-view">
    <h1>Mes recettes favorites</h1>

    <div v-if="favoriteStore.favorites.length > 0" class="recipes-grid">
      <RecipeCard
          v-for="favorite in favoriteStore.favorites"
          :key="favorite.id"
          :recipe="favorite"
      />
    </div>

    <div v-else class="no-favorites">
      <p>Aucune recette favorite pour le moment.</p>
      <p>Ajoutez des recettes à vos favoris en cliquant sur le bouton ♥ dans la liste des recettes.</p>
    </div>
  </div>
</template>

<style scoped>
.favorites-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.no-favorites {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 2rem;
}

.no-favorites p {
  margin: 0.5rem 0;
  color: #6c757d;
}

.no-favorites p:first-child {
  font-weight: 600;
  color: #495057;
}
</style>