<template>
  <div class="dish-list">
    <div v-for="dish in dishes" :key="dish.id" class="card">
      <img :src="dish.image" alt="Dish Image" class="card-img">
      <div class="card-body">
        <h5 class="card-title">{{ dish.title }}</h5>
        <p class="card-price">{{ dish.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const dishes = ref([]);

const fetchDishes = async () => {
  try {
    const ordersResponse = await axios.get('/api/orders');
    console.log('👋', ordersResponse.data);
    const kitchenResponse = await axios.get('/api/kitchen/orders');
    dishes.value = [...ordersResponse.data, ...kitchenResponse.data];
  } catch (error) {
    console.error('Error fetching dishes:', error);
  }
};

onMounted(fetchDishes);
</script>

<style scoped>
.dish-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  width: 200px;
}
.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.card-body {
  padding: 1em;
}
.card-title {
  font-size: 1.2em;
  margin: 0;
}
.card-price {
  color: #007bff;
  font-size: 1em;
}
</style>