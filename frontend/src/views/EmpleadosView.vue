<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { VueGoodTable } from 'vue-good-table-next'
import { useAuthStore } from '@/stores/auth.js'
import { useToastStore } from '@/stores/toast.js'
import { URL } from '@/api.js'

const authStore = useAuthStore()
const toast = useToastStore()

const empleados = ref([])
const columns = [
  { label: 'Nombre', field: 'nombre', sortable: true },
  { label: 'Correo', field: 'correo', sortable: true },
  { label: 'Acciones', field: 'actions' }
]

const showCreateModal = ref(false)
const showEditModal = ref(false)

const newEmpleado = reactive({ nombre: '', correo: '', contrasena: '' })
const editingEmpleado = reactive({ _id: null, nombre: '', correo: '', contrasena: '' })
const createErrors = reactive({ nombre: '', correo: '', contrasena: '' })
const editErrors = reactive({ nombre: '', correo: '', contrasena: '' })

onMounted(cargarEmpleados)

async function cargarEmpleados () {
  try {
    const resp = await axios.get(`${URL}empleados/consultar`)
    empleados.value = resp.data
  } catch (err) {
    console.error(err)
    toast.mostrar('Error al cargar los empleados. Inténtalo de nuevo.', 'error')
  }
}

function openCreateModal () {
  newEmpleado.nombre = ''
  newEmpleado.correo = ''
  newEmpleado.contrasena = ''
  createErrors.nombre = ''
  createErrors.correo = ''
  createErrors.contrasena = ''
  showCreateModal.value = true
}

function validarEmpleadoData (emp, errors, requirePassword = true) {
  errors.nombre = emp.nombre.trim() ? '' : 'El nombre es obligatorio'
  errors.correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emp.correo)
    ? ''
    : 'Correo inválido'
  if (requirePassword || emp.contrasena) {
    errors.contrasena = emp.contrasena.length >= 6
      ? ''
      : 'La contraseña debe tener al menos 6 caracteres'
  } else {
    errors.contrasena = ''
  }
  return !errors.nombre && !errors.correo && !errors.contrasena
}

async function crearEmpleado () {
  if (!validarEmpleadoData(newEmpleado, createErrors, true)) return
  try {
    await axios.post(`${URL}empleados/crear`, { ...newEmpleado })
    toast.mostrar('Empleado creado correctamente.', 'success')
    showCreateModal.value = false
    await cargarEmpleados()
  } catch (err) {
    console.error(err)
    toast.mostrar(err.response.data.error, 'success')
  }
}

function openEditModal (empleado) {
  editingEmpleado._id = empleado._id
  editingEmpleado.nombre = empleado.nombre
  editingEmpleado.correo = empleado.correo
  editingEmpleado.contrasena = ''
  editErrors.nombre = ''
  editErrors.correo = ''
  editErrors.contrasena = ''
  showEditModal.value = true
}

async function actualizarEmpleado () {
  if (!validarEmpleadoData(editingEmpleado, editErrors, false)) return
  try {
    await axios.patch(`${URL}empleados/actualizar/${editingEmpleado._id}`, {
      nombre: editingEmpleado.nombre,
      correo: editingEmpleado.correo,
      contrasena: editingEmpleado.contrasena
    })
    toast.mostrar('Empleado actualizado correctamente.', 'success')
    showEditModal.value = false
    await cargarEmpleados()
  } catch (err) {
    console.error(err)
    toast.mostrar(err, 'error')
  }
}

async function eliminarEmpleado (id) {
  try {
    await axios.delete(`${URL}empleados/eliminar/${id}`)
    toast.mostrar('Empleado eliminado correctamente.', 'success')
    await cargarEmpleados()
  } catch (err) {
    console.error(err)
    toast.mostrar(err, 'error')
  }
}
</script>
<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">Empleados</h1>
        <p class="lead text-body-secondary">
          Gestiona los empleados. Aquí podrás ver, agregar, editar y eliminar empleados.
        </p>
        <p>
          <button class="btn btn-primary my-2" @click="openCreateModal">Agregar empleado</button>
        </p>
      </div>
    </div>
  </section>

  <div class="container pb-5">
    <VueGoodTable
      :columns="columns"
      :rows="empleados"
      :search-options="{ enabled: true }"
      :pagination-options="{ enabled: true, perPage: 5 }"
    >
      <template #table-row="props">
        <span v-if="props.column.field === 'actions'">
          <button
            class="btn btn-sm btn-outline-primary me-2"
            @click="openEditModal(props.row)"
          >
            Editar
          </button>
          <button
            v-if="props.row._id !== authStore.user.id"
            class="btn btn-sm btn-outline-danger"
            @click="eliminarEmpleado(props.row._id)"
          >
            Eliminar
          </button>
        </span>
      </template>
    </VueGoodTable>
  </div>

  <!-- Modal Crear -->
  <div
    v-if="showCreateModal"
    class="modal fade show"
    style="display: block" 
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar empleado</h5>
          <button type="button" class="btn-close" @click="showCreateModal = false"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              v-model="newEmpleado.nombre"
              :class="{ 'is-invalid': createErrors.nombre }"
            />
            <div class="invalid-feedback">{{ createErrors.nombre }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Correo</label>
            <input
              type="email"
              class="form-control"
              v-model="newEmpleado.correo"
              :class="{ 'is-invalid': createErrors.correo }"
            />
            <div class="invalid-feedback">{{ createErrors.correo }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              v-model="newEmpleado.contrasena"
              :class="{ 'is-invalid': createErrors.contrasena }"
            />
            <div class="invalid-feedback">{{ createErrors.contrasena }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showCreateModal = false">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="crearEmpleado">Guardar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showCreateModal" class="modal-backdrop fade show"></div>

  <!-- Modal Editar -->
  <div
    v-if="showEditModal"
    class="modal fade show"
    style="display: block" 
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar empleado</h5>
          <button type="button" class="btn-close" @click="showEditModal = false"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              v-model="editingEmpleado.nombre"
              :class="{ 'is-invalid': editErrors.nombre }"
            />
            <div class="invalid-feedback">{{ editErrors.nombre }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Correo</label>
            <input
              type="email"
              class="form-control"
              v-model="editingEmpleado.correo"
              :class="{ 'is-invalid': editErrors.correo }"
            />
            <div class="invalid-feedback">{{ editErrors.correo }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              v-model="editingEmpleado.contrasena"
              :class="{ 'is-invalid': editErrors.contrasena }"
            />
            <div class="invalid-feedback">{{ editErrors.contrasena }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showEditModal = false">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="actualizarEmpleado">Actualizar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showEditModal" class="modal-backdrop fade show"></div>
</template>
