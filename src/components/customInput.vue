<template>
  <!-- <input
    @blur="handleBlur"
    v-model="fieldValue"
    @input="handleChange"
    :disabled="props.disabled"
    style="border: 1px solid black"
  />
  <span>{{ errorMessage }}</span> -->
  <v-text-field
    v-model="fieldValue"
    :label="props.label"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :error-messages="computedErrorMessage ? [computedErrorMessage] : []"
    @blur="handleBlur"
    @input="handleChange"
    variant="outlined"
  />
</template>

<script setup lang="ts">
import { handleValidation } from '@/utils'
import { TValidations } from '@/utils/types'
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'

// Props del componente.
const props = defineProps<{
  schema: any
  name: string
  label: string
  disabled?: boolean
  placeholder?: string
  validations: TValidations
  onChange?: (e: Event) => void
}>()

const {
  value: fieldValue,
  errorMessage: veeErrorMessage,
  handleBlur: onBlur,
  handleChange: onChange
} = useField(() => props.name, props.schema)

// Estado del error de las validaciones.
let errorMessage = ref<string[]>([])

// Computed para manejar el mensaje de error.
const computedErrorMessage = computed(() => {
  // Prioriza el mensaje de error de vee-validate
  return veeErrorMessage || (errorMessage?.value?.length > 0 ? errorMessage?.value[0] : null)
})

/**
 * @function handleBlur
 * @param event
 */
const handleBlur = (event: Event) => {
  onBlur(event)
}

/**
 * @function handleChange
 * @param e
 */
const handleChange = (e: Event) => {
  if (!props.disabled) {
    // Errores
    let error: string[] = []

    const { validations } = props

    // Validaciones
    if (validations) {
      const { errors, transformedValue } = handleValidation(validations, e)

      // Actualiza mensajes de error
      error = errors?.length > 0 ? errors : []

      // Actualiza el valor del campo solo si viene transformedValue
      if (transformedValue !== undefined) {
        ;(e.target as HTMLInputElement).value = transformedValue
      }
    }

    // Sincroniza errores con VeeValidate
    errorMessage.value = error?.length > 0 ? error : []

    // Llama a la función handleChange de VeeValidate
    onChange(e)

    // Llama a la función onChange si se proporciona
    if (props?.onChange) props?.onChange(e)
  }
}
</script>
