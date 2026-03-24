<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-container">
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/favorites">Favoris</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

nav a.router-link-active {
  background: #f0f0f0;
}
</style>
