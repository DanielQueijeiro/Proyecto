<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { URL } from '@/api.js'
import ErrorGrid from '@/components/ErrorGrid.vue'

const file = ref(null)
const errors = ref([])
const loading = ref(false)
const resultMessage = ref('')
const totalRows = ref(null)

/**
 * Reinicia estado y toma el archivo del input.
 * @param {Event} event
 */
function handleFile(event) {
  errors.value = []
  resultMessage.value = ''
  totalRows.value = null
  file.value = event.target.files?.[0] ?? null
}

async function handleSubmit() {
  errors.value = []
  resultMessage.value = ''
  totalRows.value = null
  if (!file.value) return

  loading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file.value)

    const resp = await axios.post(`${URL}analisis/validar/sheet-file`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    processResponse(resp.data)
  } catch (err) {
    console.error(err)
    errors.value = [{ row: '-', column: '-', message: 'Error al procesar el archivo' }]
    resultMessage.value = 'Error al procesar el archivo'
    totalRows.value = null
  } finally {
    loading.value = false
  }
}

/**
 * Procesa la respuesta del backend y arma los mensajes de UI.
 * @param {{errors?:Array, totalRows?:number}} data
 */
function processResponse(data) {
  errors.value = data?.errors ?? []
  totalRows.value = typeof data?.totalRows === 'number' ? data.totalRows : null

  resultMessage.value = errors.value.length
    ? `Se encontraron ${errors.value.length} errores`
    : 'Archivo válido'
}
</script>

<template>
  <section class="py-5 container">
    <div class="row text-center py-lg-5">
      <div class="col-lg-8 col-md-10 mx-auto">
        <h1 class="fw-light">Análisis de documentos</h1>
        <p class="lead text-body-secondary">
          Sube tu archivo para validar columnas y detectar errores.
        </p>

        <div class="input-group mb-2">
          <input
            class="form-control"
            type="file"
            id="formFile"
            accept=".xlsx,.ods,.csv"
            @change="handleFile"
          />
          <button
            type="button"
            class="btn btn-primary"
            @click="handleSubmit"
            :disabled="loading || !file"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-if="!loading">Validar archivo</span>
          </button>
        </div>

        <small class="text-body-secondary d-block text-start">
          Tamaño máximo recomendado: 50MB.
        </small>
      </div>
    </div>

    <p v-if="totalRows !== null" class="text-center text-body-secondary">
      Registros leídos: {{ totalRows }}
    </p>
    
    <p
      v-if="resultMessage"
      class="mt-3 text-center"
      :class="{ 'text-success': !errors.length, 'text-danger': errors.length }"
    >
      {{ resultMessage }}
    </p>

    <ErrorGrid v-if="errors.length" :errors="errors" />
  </section>
</template>
