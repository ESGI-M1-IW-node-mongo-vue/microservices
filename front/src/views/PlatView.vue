<script setup>
import { onMounted, ref } from 'vue';

const dishes = ref([]);
const newDish = ref({
  name: '',
  description: '',
  ingredients: []
});
const ingredient = ref(''); // Variable pour ajouter un nouvel ingrédient

const token = localStorage.getItem('token') ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiNjcyY2MyYTNmYThlODZmYTUyMmI5OTgzIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MzEwNzY0ODF9.WmZGMyfbiaTd7Xj0Av4TyWCK8a0aJP05YVx8gsmXb20";
console.log('👋',token)
// Fonction pour récupérer les plats existants
const fetchDishes = async () => {
  try {
    const response = await fetch('http://localhost:8000/kitchen/api/dishes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    dishes.value = data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

// Appel à la récupération des plats au montage du composant
onMounted(async () => {
  await fetchDishes();
});

// Fonction pour ajouter un plat
const addDish = async () => {
  try {
    const response = await fetch('http://localhost:8000/kitchen/api/dishes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDish.value)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Réinitialisation du formulaire et mise à jour de la liste des plats
    newDish.value = { name: '', description: '', ingredients: [] };
    await fetchDishes(); // Rafraîchit la liste des plats
  } catch (error) {
    console.error("Erreur lors de l'ajout du plat :", error);
  }
};

// Fonction pour ajouter un ingrédient à la liste
const addIngredient = () => {
  if (ingredient.value.trim()) {
    newDish.value.ingredients.push(ingredient.value.trim());
    ingredient.value = ''; // Réinitialise le champ d'ingrédient
  }
};
</script>

<template>
  <div class="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-white mb-4">Ajouter un nouveau plat</h1>

    <!-- Formulaire pour ajouter un nouveau plat -->
    <form @submit.prevent="addDish" class="bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium">Nom du plat</label>
        <input v-model="newDish.name" type="text" id="name" required
               class="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-medium">Description</label>
        <textarea v-model="newDish.description" id="description" rows="3"
                  class="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium">Ingrédients</label>
        <div class="flex">
          <input v-model="ingredient" type="text" placeholder="Ajouter un ingrédient"
                 class="w-full p-2 mt-1 border rounded-l-md focus:outline-none focus:border-blue-500">
          <button @click.prevent="addIngredient" type="button"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 rounded-r-md">
            +
          </button>
        </div>
        <ul class="mt-2">
          <li v-for="(ing, index) in newDish.ingredients" :key="index" class="text-gray-600 text-sm mt-1">
            • {{ ing }}
          </li>
        </ul>
      </div>

      <button type="submit" class="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md">
        Ajouter le plat
      </button>
    </form>

    <!-- Liste des plats existants -->
    <h2 class="text-2xl font-bold text-white mb-4">Liste des plats</h2>
    <ul>
      <li v-for="dish in dishes" :key="dish.name" class="bg-white p-4 rounded-md mb-4">
        <h3 class="text-lg font-medium text-gray-800 mb-2">{{ dish.name }}</h3>
        <p class="text-gray-600">{{ dish.description }}</p>
        <div class="flex justify-between items-center mt-4">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
            Ajouter au panier
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
