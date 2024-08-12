<template>
  <input
    @blur="handleBlur"
    v-model="state.value"
    @input="handleChange"
    :disabled="props.disabled"
    style="border: 1px solid black"
  />
  <span>{{ errorMessage ? errorMessage : state?.errorMessage }}</span>
</template>

<script setup lang="ts">
import { handleValidation } from '@/utils'
import { TValidations } from '@/utils/types'
import { useField } from 'vee-validate'
import { reactive } from 'vue'

const props = defineProps<{
  name: string
  schema: any
  disabled?: boolean
  validations: TValidations
  onChange?: (e: Event) => void
}>()

const {
  value: fieldValue,
  errorMessage,
  handleBlur: onBlur,
  handleChange: onChange,
  setErrors
} = useField(() => props.name, props.schema)

/**
 * Estado reactivo
 */
const state = reactive({
  value: fieldValue,
  errorMessage: ''
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
    let error: string | string[] = []

    const { validations } = props

    // Validaciones
    if (validations) {
      const result = handleValidation(validations, e)

      if (result) {
        if (typeof result === 'string') {
          ;(e.target as HTMLInputElement).value = result
        }
        if (result instanceof Array) {
          error = result
        }
      }
    }

    state.errorMessage = error?.length > 0 ? error?.join(', ') : ''

    setErrors(error?.length > 0 ? error : '')

    onChange(e)

    if (props?.onChange) props?.onChange(e)
  }
}
</script>
