<script setup>
const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <table class="table table-bordered mt-3">
    <thead>
      <tr>
        <th>Fila</th>
        <th>Columna</th>
        <th>Error</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(err, index) in props.errors" :key="index">
        <td>{{ err.row }}</td>
        <td>{{ err.column || '-' }}</td>
        <td>{{ err.message }}</td>
      </tr>
    </tbody>
  </table>
</template>