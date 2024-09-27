<script setup lang="ts">
import { lowercase, upperCase } from '@/utils'
import { useField } from 'vee-validate'
import { VTextField, VTextarea } from 'vuetify/components'

// Definición de las props del componente.
const props = defineProps<{
  id: string
  schema: any
  name: string
  label: string
  disabled?: boolean
  placeholder?: string
  isUpperCase?: boolean
  isLowerCase?: boolean
  type: 'text' | 'textarea'
  onChange?: (e: Event) => void
}>()

const { id, schema, name, label, disabled, isUpperCase, isLowerCase, onChange, placeholder, type } =
  props

const {
  value: fieldValue,
  errorMessage,
  handleBlur: onBlur,
  handleChange: handleOnChange
} = useField(() => name, schema)

/**
 * @function handleBlur
 * @param event - El evento de blur
 */
const handleBlur = (event: Event) => {
  onBlur(event)
}

/**
 * @function handleChange
 * @param e - El evento de input
 */
const handleChange = (e: Event) => {
  if (!disabled) {
    const inputValue = (e.target as HTMLInputElement).value

    // Aplica transformaciones en función de las props
    if (isUpperCase) (e.target as HTMLInputElement).value = upperCase(inputValue)
    if (isLowerCase) (e.target as HTMLInputElement).value = lowercase(inputValue)

    // Llama a la función handleChange de VeeValidate
    handleOnChange(e)

    // Llama a la función onChange si se proporciona
    if (onChange) onChange(e)
  }
}
</script>

<!-- Componente -->
<template>
  <component
    :is="type === 'text' ? VTextField : VTextarea"
    :id="id"
    width="100%"
    :label="label"
    @blur="handleBlur"
    variant="outlined"
    :disabled="disabled"
    v-model="fieldValue"
    @input="handleChange"
    :placeholder="placeholder"
    :error-messages="errorMessage"
    :no-resize="type === 'textarea'"
  />
</template>
