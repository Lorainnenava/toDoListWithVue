import { defineStore } from 'pinia'

// Puedes pensar en él state como el data de la tienda, getters como las
// computed propiedades de la tienda y actions como el methods.
export const useValidateUserStore = defineStore('validate', {
  state: () => ({ value: '', count: 0, errorMessage: '', error: false, disabled: false }),

  getters: { doubleCount: (state) => state.count * 2 },

  actions: {
    setValue(newValue: string) {
      this.value = newValue
    },
    setErrorMessage(message: string) {
      this.errorMessage = message
    },
    setError(hasError: boolean) {
      this.error = hasError
    }
  }
})
