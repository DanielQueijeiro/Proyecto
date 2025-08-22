<script setup>

function handleSubmit() {
  // Cargar csv
}
    
</script>

<template>
    <section class="container">
        <div class="mb-3">
            <label for="formFile" class="form-label">Sube tu archivo CSV</label>
            <input class="form-control" type="file" id="formFile">
        </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3" @click="handleSubmit">Enviar archivo</button>
        </div>
    </section>
</template>