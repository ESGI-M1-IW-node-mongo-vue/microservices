<template>
  <div class="h-screen flex items-center justify-center">
    <p>Livraison</p>
    {{orders}}
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const orders = ref(null)

const getOrders = async function () {
  await fetch('http://127.0.0.1:8000/livraison/api/order',{
    method:"get",

  }).then((res) => {
    console.log(res)
  })
}

getOrders()
</script>