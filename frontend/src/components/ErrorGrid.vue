<script setup>
import { computed } from 'vue'
import { VueGoodTable } from 'vue-good-table-next'

const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
})

const columns = [
  { label: 'Fila', field: 'row', sortable: true },
  { label: 'Columna', field: 'column', sortable: true },
  { label: 'Error', field: 'message' },
]

const rows = computed(() =>
  props.errors.map((err) => ({
    ...err,
    column: err.column || '-',
  })),
)
</script>

<template>
  <div class="mt-3">
    <VueGoodTable
      :columns="columns"
      :rows="rows"
      :search-options="{ enabled: true }"
      :pagination-options="{ enabled: true, perPage: 10 }"
    />
  </div>
</template>