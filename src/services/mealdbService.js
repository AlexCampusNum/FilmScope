import axios from 'axios';

// Configuration de base pour Axios
const apiClient = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    // Récupérer une liste de recettes aléatoires
    getRandomMeals(count = 20) {
        return apiClient.get(`random.php`);
    },

    // Rechercher des recettes par nom
    searchMeals(query) {
        return apiClient.get(`search.php?s=${query}`);
    },

    // Récupérer les détails d'une recette par ID
    getMealDetails(id) {
        return apiClient.get(`lookup.php?i=${id}`);
    },

};