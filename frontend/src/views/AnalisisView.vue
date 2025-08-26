<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { URL } from '@/api.js'
import ErrorGrid from '@/components/ErrorGrid.vue'

const file = ref(null)
const errors = ref([])
const loading = ref(false)
const resultMessage = ref('')
const totalRows = ref(null)

/** 0–60%: subida; 60–99%: procesando (indeterminado visual); 100%: listo */
const progress = ref(0)
/** 'idle' | 'upload' | 'processing' | 'done' | 'error' */
const phase = ref('idle')

/** Texto dentro de la barra */
const progressText = computed(() => {
  switch (phase.value) {
    case 'upload': return `Subiendo… ${progress.value}%`
    case 'processing': return 'Procesando en el servidor…'
    case 'done': return 'Completado'
    case 'error': return 'Error'
    default: return ''
  }
})

/** @const Marcadores de tiempo para medir el total */
const startedAt = ref(null)
const endedAt = ref(null)
/** @const Texto a mostrar con el tiempo total */
const timeMessage = ref('')

/**
 * @function formatMs
 * @description Convierte milisegundos a un texto legible (segundos con 2 decimales, o min+seg).
 * @param {number} ms
 * @returns {string}
 */
function formatMs(ms) {
  if (typeof ms !== 'number' || !isFinite(ms)) return '-'
  if (ms >= 60000) {
    const m = Math.floor(ms / 60000)
    const s = ((ms % 60000) / 1000).toFixed(2)
    return `${m}m ${s}s`
  }
  return `${(ms / 1000).toFixed(2)} s`
}

/**
 * @function handleFile
 * @description Reinicia estado y toma el archivo del input.
 * @param {Event} event
 */
function handleFile(event) {
  errors.value = []
  resultMessage.value = ''
  totalRows.value = null
  progress.value = 0
  phase.value = 'idle'
  timeMessage.value = ''
  startedAt.value = null
  endedAt.value = null
  file.value = event.target.files?.[0] ?? null
}

/**
 * @function handleSubmit
 * @description Envía el archivo, muestra progreso y calcula el tiempo total.
 */
async function handleSubmit() {
  errors.value = []
  resultMessage.value = ''
  totalRows.value = null
  timeMessage.value = ''
  if (!file.value) return

  loading.value = true
  progress.value = 0
  phase.value = 'upload'
  startedAt.value = performance.now()

  try {
    const fd = new FormData()
    fd.append('file', file.value)

    const resp = await axios.post(`${URL}analisis/validar/sheet-file`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      /**
       * @callback onUploadProgress
       * @param {ProgressEvent} e
       * @description Progreso real de SUBIDA (0–60% de la barra).
       */
      onUploadProgress: (e) => {
        if (e.total) {
          const pct = Math.round((e.loaded / e.total) * 60)
          progress.value = Math.min(Math.max(pct, 1), 60)
          if (e.loaded === e.total) {
            phase.value = 'processing'
            progress.value = Math.max(progress.value, 90)
          }
        } else {
          progress.value = Math.max(progress.value, 15)
        }
      },
      /**
       * @callback onDownloadProgress
       * @description Marca visualmente que ya se está recibiendo respuesta.
       */
      onDownloadProgress: () => {
        if (phase.value !== 'processing') {
          phase.value = 'processing'
          progress.value = Math.max(progress.value, 90)
        }
      }
    })

    processResponse(resp.data)

    endedAt.value = performance.now()
    progress.value = 100
    phase.value = 'done'

    /** @note Solo tiempo total (sin desglose) */
    const totalMs = endedAt.value - startedAt.value
    timeMessage.value = `Tiempo total: ${formatMs(totalMs)}`
  } catch (err) {
    console.error(err)
    errors.value = [{ row: '-', column: '-', message: 'Error al procesar el archivo' }]
    resultMessage.value = 'Error al procesar el archivo'
    phase.value = 'error'
    endedAt.value = performance.now()
    if (startedAt.value) {
      const totalMs = endedAt.value - startedAt.value
      timeMessage.value = `Tiempo total hasta el error: ${formatMs(totalMs)}`
    }
  } finally {
    loading.value = false
  }
}

/**
 * @function processResponse
 * @description Procesa la respuesta y arma los mensajes de UI.
 * @param {{errors?:Array, totalRows?:number}} data
 */
function processResponse(data) {
  errors.value = data?.errors ?? []
  totalRows.value = typeof data?.totalRows === 'number' ? data.totalRows : null

  const baseMsg = errors.value.length
    ? `Se encontraron ${errors.value.length} errores`
    : 'Archivo válido'

  resultMessage.value = totalRows.value !== null
    ? `Filas leídas: ${totalRows.value}. ${baseMsg}`
    : baseMsg
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

        <!-- Barra de progreso -->
        <div v-if="phase !== 'idle'" class="progress my-3" style="height: 24px;">
          <div
            class="progress-bar progress-bar-striped"
            :class="{
              'progress-bar-animated': phase !== 'done' && phase !== 'error',
              'bg-success': phase === 'done',
              'bg-danger': phase === 'error'
            }"
            role="progressbar"
            :style="{ width: (phase === 'processing' && progress < 95 ? 95 : progress) + '%', transition: 'width .3s ease' }"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {{ progressText }}
          </div>
        </div>

      </div>
    </div>

    <p
      v-if="resultMessage"
      class="mt-3 text-center"
      :class="{ 'text-success': !errors.length, 'text-danger': errors.length }"
    >
      {{ resultMessage }}
    </p>

    <!-- Solo el total de tiempo -->
    <p v-if="timeMessage" class="text-center text-body-secondary">
      {{ timeMessage }}
    </p>

    <ErrorGrid v-if="errors.length" :errors="errors" />
  </section>
</template>
