import { defineStore } from 'pinia'
import { ValidateUserT } from './types'

// Definimos la tienda utilizando la interfaz para el estado
export const useValidateUserStore = defineStore('validate', {
  // El `state` define el estado reactivo de la tienda.
  // Es el equivalente a la propiedad `data` en un componente de Vue.
  state: (): ValidateUserT => ({
    count: 0,
    value: '',
    error: false,
    loading: false,
    disabled: false,
    errorMessage: ''
  }),

  // Se utilizan para derivar o calcular valores a partir del estado de la tienda
  getters: {
    doubleCount: (state) => state.count * 2
  },

  // Las `actions` son métodos que permiten modificar el estado de la tienda.
  actions: {
    setValue(newValue: string) {
      this.value = newValue
    },

    setErrorMessage(message: string) {
      this.errorMessage = message
    },

    setError(hasError: boolean) {
      this.error = hasError
    },

    setDisabled(isDisabled: boolean) {
      this.disabled = isDisabled
    },

    setLoading(isLoading: boolean) {
      this.loading = isLoading
    },

    clearErrors() {
      this.setErrorMessage('')
      this.setError(false)
    }
  }
})
