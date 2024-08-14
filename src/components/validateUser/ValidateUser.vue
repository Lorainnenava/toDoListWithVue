<template>
  <v-card class="py-8 px-6 text-center mx-auto ma-4" elevation="12" max-width="400" width="100%">
    <h3 class="text-h6 mb-4">Verifica tu cuenta</h3>

    <div class="text-body-2">
      Te hemos enviado un código de verificación a tu correo, revisa y pega el código abajo.
      <br />
    </div>

    <v-sheet color="surface">
      <v-otp-input
        length="5"
        :model-value="value"
        type="text"
        variant="solo"
        @input="handleChange"
        :error="error"
        :disabled="disabled"
      ></v-otp-input>
    </v-sheet>
    <span>{{ errorMessage }}</span>

    <v-btn class="my-4" color="green" height="40" text="Verifica" variant="flat" width="70%">
    </v-btn>

    <div class="text-caption">
      No recibiste el código?
      <a href="#" @submit="submit">Reenviarlo</a>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { useValidateUserStore } from '@/stores/validationUser/validationUser'
import { storeToRefs } from 'pinia'

const store = useValidateUserStore()
const { value, errorMessage, disabled, error } = storeToRefs(store)

const handleChange = () => {
  if (value?.value?.length < 5) {
    store.setErrorMessage('Llene todos los campos')
    store.setError(true)
  } else {
    store.setErrorMessage('')
    store.setError(false)
  }
}

const submit = () => {
  disabled.value = true
}
</script>
