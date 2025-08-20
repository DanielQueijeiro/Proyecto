<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import axios from 'axios'
import { useToastStore } from '@/stores/toast.js'
import { URL } from '@/api.js'

const route = useRoute()
const router = useRouter()
const toast = useToastStore()

const empresa = ref(null)
const empleadosLibres = ref([])
const empleadosAsignados = ref([])
const dragEmpleado = ref(null)
const dragOrigen = ref('')

onMounted(async () => {
  await cargarDatos()
})

async function cargarDatos() {
  try {
    const respEmpresa = await axios.get(`${URL}empresas/consultar/${route.params.id}`)
    empresa.value = respEmpresa.data
    empleadosAsignados.value = respEmpresa.data.empleados || []

    const respLibres = await axios.get(`${URL}empleados/libres`)
    empleadosLibres.value = respLibres.data
  } catch (error) {
    console.error(error)
    toast.mostrar('Error al cargar los datos', 'error')
  }
}

function drag(empleado, origen) {
  dragEmpleado.value = empleado
  dragOrigen.value = origen
}

function drop(destino) {
  if (!dragEmpleado.value || dragOrigen.value === destino) return
  if (dragOrigen.value === 'libres') {
    empleadosLibres.value = empleadosLibres.value.filter((e) => e._id !== dragEmpleado.value._id)
    empleadosAsignados.value.push(dragEmpleado.value)
  } else {
    empleadosAsignados.value = empleadosAsignados.value.filter(
      (e) => e._id !== dragEmpleado.value._id,
    )
    empleadosLibres.value.push(dragEmpleado.value)
  }
  dragEmpleado.value = null
  dragOrigen.value = ''
}

async function guardar() {
  try {
    await axios.patch(`${URL}empresas/actualizar/${empresa.value._id}`, {
      nombre: empresa.value.nombre,
      direccion: empresa.value.direccion,
      telefono: empresa.value.telefono,
      empleados: empleadosAsignados.value.map((e) => e._id),
      areas: empresa.value.areas ? empresa.value.areas.map((a) => a._id) : [],
    })
    toast.mostrar('Empleados actualizados correctamente', 'success')
    router.push('/empresas')
  } catch (error) {
    console.error(error)
    toast.mostrar('Error al actualizar los empleados', 'error')
  }
}
</script>

<template>
  <div class="container py-5">
    <h1 class="mb-4">Administrar empleados</h1>
    <div class="row">
      <div class="col-md-6">
        <h5 class="mb-3">Asignados</h5>
        <div class="list-group h-auto p-3 border" @dragover.prevent @drop="drop('asignados')">
          <div
            v-for="empleado in empleadosAsignados"
            :key="empleado._id"
            class="list-group-item"
            draggable="true"
            @dragstart="drag(empleado, 'asignados')"
          >
            {{ empleado.nombre }}
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h5 class="mb-3">Disponibles</h5>
        <div class="list-group h-auto p-3 border" @dragover.prevent @drop="drop('libres')">
          <div
            v-for="empleado in empleadosLibres"
            :key="empleado._id"
            class="list-group-item"
            draggable="true"
            @dragstart="drag(empleado, 'libres')"
          >
            {{ empleado.nombre }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button class="btn btn-primary me-2" @click="guardar">Guardar</button>
      <RouterLink to="/empresas" class="btn btn-secondary">Volver</RouterLink>
    </div>
  </div>
</template>
