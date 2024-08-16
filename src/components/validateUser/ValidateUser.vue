<script setup lang="ts">
import { useValidateUserStore } from '@/stores/validationUser/validationUser'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

// Se llama al store para manejar el estado del componente
const store = useValidateUserStore()
const { value, errorMessage, disabled, error } = storeToRefs(store)

/**
 * @function handleSubmit
 * Maneja la lógica de validación del formulario.
 * Si el campo cumple con el requisito, limpia los errores.
 */
const handleSubmit = () => {
  if (value.value.length < 5) {
    store.setErrorMessage('Llene todos los campos')
    store.setError(true)
  } else {
    store.clearErrors()
  }
}

// Observa los cambios del campo value y ejecuta `handleSubmit` y actualiza los errores en tiempo real.
watch(() => value.value, handleSubmit)
</script>

<!--  Componente  -->
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
        type="text"
        :error="error"
        v-model="value"
        :disabled="disabled"
      ></v-otp-input>
    </v-sheet>

    <div class="text-subtitle-2 text-red-darken-2" v-if="errorMessage">{{ errorMessage }}</div>

    <v-btn
      class="my-4"
      color="green"
      height="40"
      text="Verifica"
      variant="flat"
      width="70%"
      @click="handleSubmit"
    >
    </v-btn>

    <div class="text-caption">
      No recibiste el código?
      <a href="#">Reenviarlo</a>
    </div>
  </v-card>
</template>
