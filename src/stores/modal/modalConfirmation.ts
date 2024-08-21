import { defineStore } from 'pinia'
import { ModalT } from './types'

export const modalConfirmationStore = defineStore('modalConfirmation', {
  state: (): ModalT => ({
    open: false,
    loading: false,
    disabled: false
  }),

  actions: {
    setOpen(isOpen: boolean) {
      this.open = isOpen
    },

    setDisabled(isDisabled: boolean) {
      this.disabled = isDisabled
    },

    setLoading(isLoading: boolean) {
      this.loading = isLoading
    }
  }
})
