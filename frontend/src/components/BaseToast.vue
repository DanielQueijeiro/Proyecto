<script setup>
import { onMounted, watch } from 'vue'
import { Toast } from 'bootstrap'
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const { mensaje, tipo, timestamp } = storeToRefs(toastStore)

let toastBootstrap = null
onMounted(() => {
  const toastLiveExample = document.getElementById('liveToast')
  if (toastLiveExample) {
    toastBootstrap = new Toast(toastLiveExample)
  }
})

watch(timestamp, () => {
  if (mensaje.value && toastBootstrap) {
    toastBootstrap.show()
  }
})
</script>

<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex rounded" :class="tipo === 'success' ? 'bg-success' : 'bg-danger'">
        <div class="toast-body text-white">
          {{ mensaje }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="toastStore.limpiar()"
        ></button>
      </div>
    </div>
  </div>
</template>
