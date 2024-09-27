import { defineStore } from 'pinia'
import { TLogin } from './types'

export const LoginStore = defineStore('login', {
  state: (): TLogin => ({
    loading: false,
    disabled: false
  }),

  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading
    },
    setDisabled(isDisabled: boolean) {
      this.disabled = isDisabled
    }
  }
})
