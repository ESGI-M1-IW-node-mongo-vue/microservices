<script setup>
import { onMounted, ref } from 'vue';

const dishes = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/kitchen/api/dishes'); // Assurez-vous d'utiliser "http://" ou "https://"

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    dishes.value = data; // Stocke les données dans une variable réactive
    console.log(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
});
</script>

<template>
  <div>
    <h1>PlatView</h1>
    <p>TEST DE LA PAGE</p>

    <ul>
      <li v-for="(dish, index) in dishes" :key="index">{{ dish.name }}</li> <!-- Affiche les plats si disponibles -->
    </ul>
  </div>
</template>

<style scoped>
</style>
