import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { io } from 'socket.io-client'
import { useToastStore } from '@/stores/toast.js'
import { useAuthStore } from '@/stores/auth.js'

import App from './App.vue'
import router from './router'
axios.defaults.withCredentials = true

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
const auth = useAuthStore(pinia)
await auth.restore()
app.use(router)

const socket = io('http://localhost:8080', { withCredentials: true })
socket.on('empresa:notificacion', ({ accion, empresa, usuario }) => {
  const toast = useToastStore(pinia)
  const nombre = empresa?.nombre ? `"${empresa.nombre}" ` : ''
  toast.mostrar(`Empresa ${nombre}${accion} por ${usuario}`)
})

app.mount('#app')
