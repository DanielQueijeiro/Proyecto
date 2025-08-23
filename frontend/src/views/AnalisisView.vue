<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { URL } from '@/api.js'
import ErrorGrid from '@/components/ErrorGrid.vue'

const file = ref(null)
const errors = ref([])

function handleFile(event) {
  file.value = event.target.files[0]
}

function handleSubmit() {
  errors.value = []
  if (!file.value) return
  const reader = new FileReader()
  reader.onload = async (e) => {
    try {
      const resp = await axios.post(`${URL}analisis/validar`, { csv: e.target.result })
      errors.value = resp.data.errors || []
    } catch (err) {
      console.error(err)
      errors.value = [{ row: '-', column: '-', message: 'Error al procesar el archivo' }]
    }
  }
  reader.readAsText(file.value)
}

</script>

<template>
  <section class="container">
    <div class="mb-3">
      <label for="formFile" class="form-label">Sube tu archivo CSV</label>
      <input class="form-control" type="file" id="formFile" @change="handleFile" />
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary mb-3" @click="handleSubmit">
        Enviar archivo
      </button>
    </div>
    <ErrorGrid v-if="errors.length" :errors="errors" />
  </section>
</template>