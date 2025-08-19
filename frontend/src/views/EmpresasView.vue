<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import { useToastStore } from '@/stores/toast.js'
import { URL } from '@/api.js'

const toast = useToastStore()

const empresas = ref([])
const defaultLogo = '/public/empresas/meta.webp'

const showCreateModal = ref(false)
const showEditModal = ref(false)

const newLogo = ref('')
const editingLogo = ref('')

const newEmpresa = reactive({ nombre: '', direccion: '', telefono: '' })
const editingEmpresa = reactive({
  _id: null,
  nombre: '',
  direccion: '',
  telefono: ''
})

onMounted(cargarEmpresas)

async function cargarEmpresas () {
  try {
    const resp = await axios.get(`${URL}empresas/consultar`)
    empresas.value = resp.data
  } catch (err) {
    console.error('Error fetching empresas:', err)
    toast.mostrar('Error al cargar las empresas. Inténtalo de nuevo.', 'error')
  }
}

function openCreateModal () {
  newEmpresa.nombre = ''
  newEmpresa.direccion = ''
  newEmpresa.telefono = ''
  newLogo.value = ''
  showCreateModal.value = true
}

async function crearEmpresa () {
  try {
    const payload = { ...newEmpresa }
    if (newLogo.value) {
      payload.logo = newLogo.value
    }
    await axios.post(`${URL}empresas/crear`, payload)
    toast.mostrar('Empresa creada correctamente.', 'success')
    showCreateModal.value = false
    await cargarEmpresas()
  } catch (error) {
    console.error(error)
    toast.mostrar(err.response.data.error, 'error')
  }
}

function openEditModal (empresa) {
  editingEmpresa._id = empresa._id
  editingEmpresa.nombre = empresa.nombre
  editingEmpresa.direccion = empresa.direccion
  editingEmpresa.telefono = empresa.telefono
  editingLogo.value = ''
  showEditModal.value = true
}

async function actualizarEmpresa () {
  try {
    const payload = {
      nombre: editingEmpresa.nombre,
      direccion: editingEmpresa.direccion,
      telefono: editingEmpresa.telefono
    }
    if (editingLogo.value) {
      payload.logo = editingLogo.value
    }
    await axios.patch(`${URL}empresas/actualizar/${editingEmpresa._id}`, payload)
    toast.mostrar('Empresa actualizada correctamente.', 'success')
    showEditModal.value = false
    await cargarEmpresas()
  } catch (error) {
    console.error(error)
    toast.mostrar(err.response.data.error, 'error')
  }
}

async function eliminarEmpresa (id) {
  try {
    await axios.delete(`${URL}empresas/eliminar/${id}`)
    empresas.value = empresas.value.filter((empresa) => empresa._id !== id)
    toast.mostrar('Empresa eliminada correctamente.', 'success')
  } catch (error) {
    console.error(error)
    toast.mostrar('Error al eliminar la empresa. Por favor, inténtalo de nuevo.', 'error')
  }
}

function handleFileChange (event, type) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    if (type === 'new') {
      newLogo.value = reader.result
    } else {
      editingLogo.value = reader.result
    }
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">Empresas</h1>
        <p class="lead text-body-secondary">
          Mantén control de las empresas. Aquí podrás ver, agregar, editar y eliminar empresas.
        </p>
        <p>
          <button class="btn btn-primary my-2" @click="openCreateModal">Agregar empresa</button>
        </p>
      </div>
    </div>
  </section>

  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-for="empresa in empresas" :key="empresa._id" class="col">
          <div class="card shadow-sm">
            <img
              :src="empresa.logo ? URL + empresa.logo : defaultLogo"
              alt="Thumbnail"
              class="bd-placeholder-img card-img-top"
              height="225"
              width="225"
            />
            <div class="card-body">
              <p class="card-text">
                {{ empresa.nombre }} - {{ empresa.direccion }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    @click="openEditModal(empresa)"
                  >
                    Editar
                  </button>
                  <button
                    @click="eliminarEmpresa(empresa._id)"
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                  >
                    Eliminar
                  </button>
                  <RouterLink
                    :to="`/empresas/${empresa._id}/administrar`"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Administrar
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <h5 class="modal-title">Agregar empresa</h5>
          <button type="button" class="btn-close" @click="showCreateModal = false"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input v-model="newEmpresa.nombre" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Dirección</label>
            <input v-model="newEmpresa.direccion" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <input v-model="newEmpresa.telefono" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Logo</label>
            <input type="file" class="form-control" @change="(e) => handleFileChange(e, 'new')" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showCreateModal = false">
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="crearEmpresa">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>

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
          <h5 class="modal-title">Editar empresa</h5>
          <button type="button" class="btn-close" @click="showEditModal = false"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input v-model="editingEmpresa.nombre" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Dirección</label>
            <input v-model="editingEmpresa.direccion" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <input v-model="editingEmpresa.telefono" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Logo</label>
            <input type="file" class="form-control" @change="(e) => handleFileChange(e, 'edit')" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showEditModal = false">
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="actualizarEmpresa">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
