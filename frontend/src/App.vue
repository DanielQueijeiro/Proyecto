<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import BaseToast from './components/BaseToast.vue';
</script>

<template>
  <NavBar />
  <RouterView />
  <BaseToast />
</template>
