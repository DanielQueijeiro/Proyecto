<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()
</script>

<template>
  <div class="container sticky-top bg-body">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <div class="col-md-1 mb-2 mb-md-0">
        <RouterLink to="/" class="d-flex align-items-center text-dark text-decoration-none">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="35" height="35" />
        </RouterLink>
      </div>
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <RouterLink to="/empresas" class="nav-link px-2" v-if="authStore.isAuthenticated"
          >Empresas</RouterLink
        >
        <RouterLink to="/empleados" class="nav-link px-2" v-if="authStore.isAuthenticated"
          >Empleados</RouterLink
        >
        <RouterLink to="/reportes" class="nav-link px-2" v-if="authStore.isAuthenticated"
          >Reportes</RouterLink
        >
      </ul>
      <div class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <RouterLink
          to="/login"
          class="btn btn-outline-primary me-2"
          v-if="!authStore.isAuthenticated"
          >Iniciar sesión</RouterLink
        >
        <RouterLink
          to="/"
          class="btn btn-outline-danger me-2"
          v-if="authStore.isAuthenticated"
          @click="authStore.logout"
          >Cerrar sesión</RouterLink
        >
      </div>
    </header>
  </div>
</template>
