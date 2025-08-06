<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()
const API_URL = 'http://localhost:8080/empleados/consultar'
const empleados = ref([])

empleados.value = fetch(API_URL, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${authStore.token}`,
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    empleados.value = data
  })
  .catch((error) => console.error('Error fetching empleados:', error))
</script>

<template>
  <div class="login">
    <h1>Bienvenido a la aplicación de empleados</h1>
  </div>

  <div class="about">
    <h1>Empleados:</h1>
    <ul>
      <li v-for="empleado in empleados" :key="empleado.id">
        {{ empleado.nombre }} {{ empleado.correo }}
      </li>
    </ul>
  </div>
</template>
