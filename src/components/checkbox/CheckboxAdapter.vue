<script setup lang="ts">
import { useField } from 'vee-validate'

// Definición de las props del componente.
const props = defineProps<{
  name: string
  schema?: any
  label: string
  disabled?: boolean
  onChange?: (e: Event) => void
}>()

// Valida el campó y maneja los errores de el
const {
  value: fieldValue,
  errorMessage: veeErrorMessage,
  handleChange
} = useField(() => props.name, props.schema)
</script>

<template>
  <v-checkbox
    :label="props.label"
    v-model="fieldValue"
    :error="!!veeErrorMessage"
    :error-messages="veeErrorMessage"
    @input="handleChange"
  ></v-checkbox>
  <span>{{ veeErrorMessage }}</span>
</template>
