<script setup lang="ts">
import { useField } from 'vee-validate'

// Definición de las props del componente.
const props = defineProps<{
  id?: string
  name: string
  schema?: any
  label: string
  disabled?: boolean
  customOnChange?: (e: Event) => void
}>()

const { id, customOnChange, disabled, label, name, schema } = props

// Valida el campó y maneja los errores de el
const {
  handleChange,
  value: fieldValue,
  errorMessage: veeErrorMessage
} = useField(() => name, schema, {
  type: 'checkbox',
  checkedValue: true,
  uncheckedValue: false
})

/**
 * @function onChange
 * @param e
 */
const onChange = (e: Event) => {
  handleChange(e)

  if (customOnChange) customOnChange(e)
}
</script>

<template>
  <v-checkbox
    :id="id"
    @change="onChange"
    :label="label"
    v-model="fieldValue"
    :error="!!veeErrorMessage"
    :disabled="disabled"
    :error-messages="veeErrorMessage"
  ></v-checkbox>
</template>
