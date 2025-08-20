import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    mensaje: '',
    tipo: 'success', // success | error
    timestamp: 0,
  }),
  actions: {
    mostrar(mensaje, tipo = 'success') {
      this.mensaje = mensaje
      this.tipo = tipo
      this.timestamp = Date.now()
    },
    limpiar() {
      this.mensaje = ''
      this.timestamp = 0
    },
  },
})
