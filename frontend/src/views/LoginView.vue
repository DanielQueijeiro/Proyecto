<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const correo = ref('')
const contrasena = ref('')
const authStore = useAuthStore()
const router = useRouter()

const URL = 'http://localhost:8080/sesion/login'

function iniciarSesion() {
  axios
    .post(URL, {
      correo: correo.value,
      contrasena: contrasena.value,
    })
    .then((response) => {
      authStore.login(response.data)

      alert('Sesión iniciada correctamente')

      router.push('/')
    })
    .catch((error) => {
      console.error('Error al iniciar sesión:', error)
      alert('Error al iniciar sesión')
    })
}
</script>

<template>
  <div class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-5 py-5">
      <div class="col-lg-7 text-center text-lg-start">
        <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">Bienvenido</h1>
        <p class="col-lg-10 fs-4">
          Por favor, ingresa tus credenciales para acceder a la aplicación de empleados.
        </p>
      </div>
      <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" @submit.prevent="iniciarSesion">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" placeholder="" v-model="correo" />
            <label for="floatingInput">Correo</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" placeholder="" v-model="contrasena" />
            <label for="floatingPassword">Contraseña</label>
          </div>
          <button
            class="w-100 btn btn-lg btn-primary"
            type="submit"
            :disabled="!correo || !contrasena"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
