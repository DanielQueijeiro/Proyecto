<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { URL } from '@/api.js'
import ErrorGrid from '@/components/ErrorGrid.vue'
import { useToastStore } from '@/stores/toast.js'

const file = ref(null)
const errors = ref([])
const loading = ref(false)
const resultMessage = ref('')

const toast = useToastStore()

function handleFile(event) {
  const selectedFile = event.target.files[0]
  if (selectedFile && selectedFile.type === 'text/csv') {
    file.value = selectedFile
  } else {
    file.value = null
    toast.mostrar('Por favor selecciona un archivo CSV válido', 'error')
  }
}

function handleSubmit() {
  errors.value = []
  resultMessage.value = ''
  if (!file.value) return
  loading.value = true
  const reader = new FileReader()
  reader.onload = async (e) => {
    try {
      const resp = await axios.post(`${URL}analisis/validar`, { csv: e.target.result })
      errors.value = resp.data.errors || []
      if (errors.value.length) {
        resultMessage.value = `Se encontraron ${errors.value.length} errores`
      } else {
        resultMessage.value = 'Archivo válido'
      }
    } catch (err) {
      console.error(err)
      errors.value = [{ row: '-', column: '-', message: 'Error al procesar el archivo' }]
      resultMessage.value = 'Error al procesar el archivo'
    } finally {
      loading.value = false
    }
  }
  reader.readAsText(file.value)
}

</script>

<template>
  <section class="container">
    <div class="mb-3">
      <label for="formFile" class="form-label">Sube tu archivo CSV</label>
      <input
        class="form-control"
        type="file"
        id="formFile"
        accept=".csv"
        @change="handleFile"
      />
    </div>
    <div class="col-auto">
      <button
        type="submit"
        class="btn btn-primary mb-3"
        @click="handleSubmit"
        :disabled="loading || !file"
      >
        <span
          v-if="loading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span v-if="!loading">Enviar archivo</span>
      </button>
    </div>
    <p
      v-if="resultMessage"
      class="mt-2"
      :class="{ 'text-success': !errors.length, 'text-danger': errors.length }"
    >
      {{ resultMessage }}
    </p>
    <ErrorGrid v-if="errors.length" :errors="errors" />
  </section>
</template>