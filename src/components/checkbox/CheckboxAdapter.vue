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

// Valida el campó y maneja los errores de el
const {
  value: fieldValue,
  errorMessage: veeErrorMessage,
  handleChange
} = useField(() => props.name, props.schema, {
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

  if (props.customOnChange) props.customOnChange(e)
}
</script>

<template>
  <v-checkbox
    :id="props.id"
    @change="onChange"
    :label="props.label"
    v-model="fieldValue"
    :error="!!veeErrorMessage"
    :disabled="props.disabled"
    :error-messages="veeErrorMessage"
  ></v-checkbox>
</template>
