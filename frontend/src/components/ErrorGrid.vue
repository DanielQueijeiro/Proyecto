<script setup>
const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="table-responsive mt-3">
    <table class="table table-bordered">
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
  </div>
</template>