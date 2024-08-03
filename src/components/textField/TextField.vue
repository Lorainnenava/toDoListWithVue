<template>
  <div>
    <component
      :is="props.type === 'textarea' ? VTextarea : VTextField"
      v-model="value"
      :label="props.label"
      :placeholder="props.placeholder"
      :type="props.type"
      :error-messages="errorMessage ? errorMessage : null"
      variant="outlined"
      density="compact"
      @blur="handleBlur"
      @change="handleChange"
      :style="{ height: '40px' }"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { lowercase, upperCase } from '@/utils'
import { regex } from '@/utils/regex'
import { useField } from 'vee-validate'
import type { ComputedRef } from 'vue'
import { VTextarea, VTextField } from 'vuetify/components'

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
  value?: string
  error?: ComputedRef<Partial<Record<string, string>>>
  disabled?: boolean
  validations?: TValidations
  onChange?: (e: Event) => void
  onBlur?: (e: FocusEvent) => void
}>()

const {
  value,
  errorMessage,
  handleBlur: onInputBlur,
  handleChange: onChange
} = useField(() => props.name)

/**
 * @handleBlur
 * @param e
 */
const handleBlur = (e: FocusEvent) => {
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
    switch (props.type) {
      case 'text':
        // Máximo de caracteres
        if (
          !!props.validations?.max &&
          (e?.target as HTMLInputElement)?.value?.length > props.validations?.max
        )
          break
        // Solo letras
        if (
          !regex?.onlyLetters?.execute.test((e?.target as HTMLInputElement)?.value) &&
          props.validations?.onlyLetters
        )
          break
        // Solo caracteres alfanuméricos
        if (
          !regex?.alphanumeric?.execute.test((e?.target as HTMLInputElement)?.value) &&
          props.validations?.alphanumeric
        )
          break
        // Sin espacios
        if (
          !regex?.noSpaces?.execute.test((e?.target as HTMLInputElement)?.value) &&
          props.validations?.noSpaces
        )
          break
        if (props.validations?.upperCase) {
          ;(e?.target as HTMLInputElement).value = upperCase((e?.target as HTMLInputElement)?.value)
        } else if (props.validations?.lowerCase) {
          ;(e?.target as HTMLInputElement).value = lowercase((e?.target as HTMLInputElement)?.value)
        }
        onChange(e)
        if (props?.onChange) props?.onChange(e)
        break
    }
  }
}
</script>
