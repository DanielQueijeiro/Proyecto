<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter, useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast.js'
import { URL } from '@/api.js'

const correo = ref('')
const contrasena = ref('')
const authStore = useAuthStore()
const toastStore = useToastStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const { id, nombre } = route.query
  if (id && nombre) {
    authStore.login({ id, nombre })
    toastStore.mostrar('Inicio de sesión exitoso', 'success')
    router.push('/')
  }
})

function iniciarSesion() {
  axios
    .post(`${URL}sesion/login`, {
      correo: correo.value,
      contrasena: contrasena.value,
    })
    .then((response) => {
      authStore.login(response.data.user)
      toastStore.mostrar('Inicio de sesión exitoso', 'success')
      router.push('/')
    })
    .catch(() => {
      toastStore.mostrar('Error al iniciar sesión. Por favor, verifica tus credenciales.', 'error')
    })
}

function iniciarSesionGoogle() {
  window.location.href = `${URL}sesion/google`
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
            id="btnIniciarSesion"
            :disabled="!correo || !contrasena"
          >
            Iniciar sesión
          </button>
          <button
            class="w-100 btn btn-lg btn-outline-danger mt-3"
            type="button"
            id="btnGoogle"
            @click="iniciarSesionGoogle"
          >
            Iniciar sesión con Google
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
