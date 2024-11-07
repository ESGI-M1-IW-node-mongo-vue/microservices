<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-6xl space-y-10">
      <div class="bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <p class="text-lg font-medium mb-4">Commandes prêtes :</p>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
            <tr>
              <th class="px-4 py-2 border-b font-medium text-left">ID</th>
              <th class="px-4 py-2 border-b font-medium text-left">Status</th>
              <th class="px-4 py-2 border-b font-medium text-left"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in ordersReady" class="border-b hover:bg-gray-100">
              <td class="px-4 py-2 text-left">{{item._id}}</td>
              <td class="px-4 py-2 text-left">
                <span :class="{
                  'bg-green-500 text-white px-2 py-1 rounded': item.status === 'ready',
                  'bg-yellow-500 text-white px-2 py-1 rounded': item.status === 'isindelivery',
                  'bg-gray-500 text-white px-2 py-1 rounded': item.status === 'delivered'
                }">
                  {{ stringStatus(item.status) }}
                </span>
              </td>
              <td class="px-4 py-2 text-left">
                <button @click="takeOrder(item._id)" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                  Prendre la commande
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <p class="text-lg font-medium mb-4">Commandes en cours de livraison :</p>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
            <tr>
              <th class="px-4 py-2 border-b font-medium text-left">ID</th>
              <th class="px-4 py-2 border-b font-medium text-left">Status</th>
              <th class="px-4 py-2 border-b font-medium text-left"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in ordersisInDelivery" class="border-b hover:bg-gray-100">
              <td class="px-4 py-2 text-left">{{item._id}}</td>
              <td class="px-4 py-2 text-left">
                <span :class="{
                  'bg-green-500 text-white px-2 py-1 rounded': item.status === 'ready',
                  'bg-yellow-500 text-white px-2 py-1 rounded': item.status === 'isindelivery',
                  'bg-gray-500 text-white px-2 py-1 rounded': item.status === 'delivered'
                }">
                  {{ stringStatus(item.status) }}
                </span>
              </td>
              <td class="px-4 py-2 text-left">
                <button @click="orderIsDelivered(item._id)" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                  Commande livrée
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <p class="text-lg font-medium mb-4">Commandes livrés :</p>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
            <tr>
              <th class="px-4 py-2 border-b font-medium text-left">ID</th>
              <th class="px-4 py-2 border-b font-medium text-left">Status</th>
              <th class="px-4 py-2 border-b font-medium text-left"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in ordersDelivered" class="border-b hover:bg-gray-100">
              <td class="px-4 py-2 text-left">{{item._id}}</td>
              <td class="px-4 py-2 text-left">
                <span :class="{
                  'bg-green-500 text-white px-2 py-1 rounded': item.status === 'ready',
                  'bg-yellow-500 text-white px-2 py-1 rounded': item.status === 'isindelivery',
                  'bg-gray-500 text-white px-2 py-1 rounded': item.status === 'delivered'
                }">
                  {{ stringStatus(item.status) }}
                </span>
              </td>
              <td class="px-4 py-2 text-left">
                <button @click="removeOrder(item._id)" class="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded">
                  Supprimer
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="fixed bottom-4 left-4 sm:static sm:mb-0">
        <button @click="addOrder()" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          Ajouter commande
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'

const ordersReady = ref(null)
const ordersisInDelivery = ref(null)
const ordersDelivered = ref(null)

const getReadyOrders = async function () {
  await fetch('http://127.0.0.1:8000/livraison/api/order/ready',{
    method:"get",
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiNjZkZWY3MWVkM2Q3NGVhMzNmMjBjMWJlIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MzEwNzMyNTJ9.0a5s-SEUbGv8uSqKKjCmQ6cu7ygqPI8jdQYHJe8LHU8"
    }
  }).then(async(res) => {
    ordersReady.value = await res.json()
  })
}

const getIsInDeliveryOrders = async function () {
  await fetch('http://127.0.0.1:8000/livraison/api/order/isindelivery',{
    method:"get",
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiNjZkZWY3MWVkM2Q3NGVhMzNmMjBjMWJlIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MzEwNzMyNTJ9.0a5s-SEUbGv8uSqKKjCmQ6cu7ygqPI8jdQYHJe8LHU8"
    }
  }).then(async(res) => {
    ordersisInDelivery.value = await res.json()
  })
}

const getDeliveredOrders = async function () {
  await fetch('http://127.0.0.1:8000/livraison/api/order/delivered',{
    method:"get",
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiNjZkZWY3MWVkM2Q3NGVhMzNmMjBjMWJlIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MzEwNzMyNTJ9.0a5s-SEUbGv8uSqKKjCmQ6cu7ygqPI8jdQYHJe8LHU8"
    }
  }).then(async(res) => {
    ordersDelivered.value = await res.json()
  })
}

const stringStatus = function (status){
  switch (status){
    case 'ready':
      return 'Prête'
    case 'isindelivery':
      return 'En cours de livraison'
    case 'delivered':
      return 'Livré'
    default:
      return 'Prête'
  }
}

const takeOrder = async function (orderId){
  await fetch(`http://127.0.0.1:8000/livraison/api/order/${orderId}`,{
    method:"put",
    body:JSON.stringify({"status":"isindelivery"}),
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiNjZkZWY3MWVkM2Q3NGVhMzNmMjBjMWJlIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MzEwNzMyNTJ9.0a5s-SEUbGv8uSqKKjCmQ6cu7ygqPI8jdQYHJe8LHU8"
    }
  })
  setTimeout(() => {
    getReadyOrders()
    getIsInDeliveryOrders()
    getDeliveredOrders()
  }, 200)
}

const orderIsDelivered = async function (orderId){
  await fetch(`http://127.0.0.1:8000/livraison/api/order/${orderId}`,{
    method:"put",
    body:JSON.stringify({"status":"delivered"}),
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiNjZkZWY3MWVkM2Q3NGVhMzNmMjBjMWJlIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MzEwNzMyNTJ9.0a5s-SEUbGv8uSqKKjCmQ6cu7ygqPI8jdQYHJe8LHU8"
    }
  })
  setTimeout(() => {
    getReadyOrders()
    getIsInDeliveryOrders()
    getDeliveredOrders()
  }, 500)
}

const addOrder = async function (){
  const data = new FormData();
  data.append("status", "ready");

  await fetch("http://127.0.0.1:8000/livraison/api/order",{
    method:"post",
    body:data,
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiNjZkZWY3MWVkM2Q3NGVhMzNmMjBjMWJlIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MzEwNzMyNTJ9.0a5s-SEUbGv8uSqKKjCmQ6cu7ygqPI8jdQYHJe8LHU8"
    }
  })
  setTimeout(() => {
    getReadyOrders()
  }, 200)
}

const removeOrder = async function(orderId){
  await fetch(`http://127.0.0.1:8000/livraison/api/order/${orderId}`,{
    method:"delete",
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoIiwic3ViIjoiNjZkZWY3MWVkM2Q3NGVhMzNmMjBjMWJlIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MzEwNzMyNTJ9.0a5s-SEUbGv8uSqKKjCmQ6cu7ygqPI8jdQYHJe8LHU8"
    }
  })
  setTimeout(() => {
    getDeliveredOrders()
  }, 200)
}

getReadyOrders()
getIsInDeliveryOrders()
getDeliveredOrders()
</script>