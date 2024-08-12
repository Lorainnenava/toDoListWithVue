<template>
  <div>
    <input v-model="value" />
    <span>{{ errorMessage }}</span>
    <!-- <v-text-field
      v-model="value"
      :label="props.label"
      :placeholder="props.placeholder"
      :type="props.type"
      :error-messages="errorMessage ? [errorMessage] : null"
      variant="outlined"
      density="compact"
      @blur="handleBlur"
      @input="handleChange"
      :style="{ height: '40px' }"
      :disabled="props.disabled"
      :class="{ 'v-text-field--error': !!errorMessage }"
    >
    </v-text-field> -->
  </div>
</template>

<script setup lang="ts">
import { lowercase, upperCase } from '@/utils'
import { regex } from '@/utils/regex'
import { useField } from 'vee-validate'
import { ComputedRef, watch } from 'vue'
import * as yup from 'yup'

type TValidations = {
  upperCase?: boolean
  lowerCase?: boolean
  onlyLetters?: boolean
  alphanumeric?: boolean
  noSpaces?: boolean
  max?: number
  onlyPositive?: boolean
}

// Definir los props
const props = defineProps<{
  type: string
  name: string
  label: string
  placeholder?: string
  error?: ComputedRef<Partial<Record<string, string>>>
  disabled?: boolean
  validations?: TValidations
  onChange?: (e: Event) => void
  onBlur?: (e: FocusEvent) => void
  schema?: any
}>()

function validateField(value) {
  if (!value) {
    return 'this field is required'
  }

  if (value.length < 8) {
    return 'this field must contain at least 8 characters'
  }

  return true
}

const {
  value,
  errorMessage,
  handleBlur: onInputBlur,
  handleChange: onInputChange,
  setErrors
} = useField(props.name, validateField)

console.log(props.schema, 'xd')
console.log(errorMessage, 'errorMessage')

errorMessage.value

// Ref para v-model

// watch(
//   () => value,
//   (newValue) => {
//     modelValue.value = newValue
//   }
// )

watch(
  () => props.schema,
  (newSchema) => {
    useField(props.name, newSchema || yup.string())
  },
  { immediate: true }
)

/**
 * @handleBlur
 * @param e
 */
const handleBlur = (e: FocusEvent) => {
  console.log('errorMessage on blur:', errorMessage.value)
  onInputBlur()
  if (props.onBlur) {
    props.onBlur(e)
  }
}

/**
 * @function handleChange
 * @param e
 */
const handleChange = (e: Event) => {
  if (!props.disabled) {
    // Obtener el valor real
    const inputValue = (e.target as HTMLInputElement).value

    // Errores
    let error: string[] = []

    // Validaciones
    if (props.validations?.max && inputValue.length > props.validations.max) {
      error.push(`Maximum length is ${props.validations.max}`)
    } else if (props.validations?.onlyLetters && !regex?.onlyLetters?.execute.test(inputValue)) {
      error.push('Only letters are allowed')
    } else if (props.validations?.alphanumeric && !regex?.alphanumeric?.execute.test(inputValue)) {
      error.push('Only alphanumeric characters are allowed')
    } else if (props.validations?.noSpaces && !regex?.noSpaces?.execute.test(inputValue)) {
      error.push('Spaces are not allowed')
    } else {
      if (props.validations?.upperCase) {
        ;(e.target as HTMLInputElement).value = upperCase(inputValue)
      } else if (props.validations?.lowerCase) {
        ;(e.target as HTMLInputElement).value = lowercase(inputValue)
      }
    }

    // console.log('Errors before setErrors:', error)

    setErrors(error.length > 0 ? error : '')

    // console.log('ErrorMessage after setErrors:', errorMessage.value)

    onInputChange(e)

    if (props?.onChange) props?.onChange(e)
  }
}
</script>

<style scoped>
.v-text-field--error {
  border-color: red !important;
}
</style>
