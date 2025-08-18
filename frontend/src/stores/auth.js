import { defineStore } from 'pinia'
import axios from 'axios'
import { URL } from '@/api.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({ isAuthenticated: false, user: null }),
  actions: {
    login(user) {
      this.isAuthenticated = true
      this.user = user
    },
    async logout() {
      try {
        await axios.post(`${URL}sesion/logout`)
      } catch (e) {
        // ignorar errores de cierre de sesión
      }
      this.isAuthenticated = false
      this.user = null
    },
    async restore() {
      try {
        const resp = await axios.get(`${URL}sesion/estado`)
        if (resp.data.usuario) {
          this.login(resp.data.usuario)
        }
      } catch (e) {
        // ignorar
      }
    },
  },
})
