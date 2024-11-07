<script setup>
const data = await fetch('localhost:8000/kitchen/api/dishes');
console.log(data);
</script>

<template>
  <div>
    <h1>PlatView</h1>
    <p>TEST DE LA PAGE</p>
  </div>
</template>

<style scoped>

</style>