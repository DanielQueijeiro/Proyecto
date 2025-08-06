import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null, isAuthenticated: false, user: null }),
  actions: {
    login(data) {
      console.log('Login data:', data)
      this.token = data.token
      this.isAuthenticated = true
      this.user = data.user
    },
    logout() {
      this.token = null
      this.isAuthenticated = false
      this.user = null
    },
  },
})
