<script setup>
import { useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  pasta: {
    type: Object,
    required: true,
    default: () => ({ id: 0, title: '', poster_url: '' })
  }
})

const emit = defineEmits(['add-favorite']);

function addToFavorites(event) {
  event.stopPropagation();
  emit('add-favorite', props.pasta);
}

function goToPastaDetail() {
  router.push(`/pasta/${props.pasta.id}`);
}
</script>

<template>
  <div class="pasta-card" @click="goToPastaDetail">
    <div class="pasta-poster">
      <img :src="pasta.poster_url" :alt="pasta.title" />
    </div>
    <h3 class="pasta-title">{{ pasta.title }}</h3>
    <div class="pasta-rating">
      <button @click.stop="addToFavorites" class="favorite-button">♥</button>
    </div>
  </div>
</template>

<style scoped>
.pasta-card {
  width: clamp(15vw, 200px, 30vw);
  max-width: 90%;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.pasta-card:hover {
  transform: translateY(-0.5rem);
}

.pasta-poster {
  width: 100%;
  margin-bottom: 1rem;
}

.pasta-poster img {
  width: 100%;
  height: auto;
  max-height: 30vh;
  object-fit: contain;
  border-radius: 0.3rem;
}

.pasta-title {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin: 0.5rem 0;
  color: #333;
  font-weight: 600;
}

.pasta-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 0.5rem;
  width: 100%;
}

.favorite-button {
  background: none;
  border: none;
  font-size: clamp(1rem, 2vw, 1.3rem);
  cursor: pointer;
  color: #ff6b6b;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
}

.favorite-button:hover {
  color: #ff0000;
  transform: scale(1.2);
}
</style>