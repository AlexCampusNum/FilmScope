import { defineStore } from 'pinia'
import { ref, computed } from "vue";


export const useFavoriteStore = defineStore('favorite', () => {
    const favorites = ref([]);

    const isFavorite = (recipeId) => {
        return favorites.value.some(recipe => recipe.id === recipeId);
    };

    const favoriteCount = computed(() => favorites.value.length);

    function addFavorite(recipe) {
        favorites.value.push(recipe);
    }

    function removeFavorite(recipeId) {
        favorites.value = favorites.value.filter(recipe => recipe.id !== recipeId);
    }

    return {
        favorites,
        isFavorite,
        favoriteCount,
        addFavorite,
        removeFavorite,
    };
})


