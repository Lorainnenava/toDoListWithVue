<script setup lang="ts">
import { TValidations } from '@/utils/types'
import { useField } from 'vee-validate'
import { ref } from 'vue'

// Props del componente.
const props = defineProps<{
  schema: any
  name: string
  label: string
  disabled?: boolean
  placeholder?: string
  validations?: TValidations
  onChange?: (e: Event) => void
  data?: { title: string; value: any }[]
}>()

const {
  value: fieldValue,
  errorMessage: veeErrorMessage,
  handleBlur: onBlur,
  handleChange: onChange
} = useField(() => props?.name, props?.schema)

// Data del input
const dataInput = ref(props?.data && props?.data?.length ? props?.data : [])
</script>

<!-- Componente -->
<template>
  <v-select
    clearable
    @onBlur="onBlur"
    :name="props.name"
    :items="dataInput"
    item-text="title"
    item-value="value"
    variant="outlined"
    :label="props.label"
    @onchange="onChange"
    v-model="fieldValue"
    :disabled="props.disabled"
    no-data-text="No hay data"
    :placeholder="props.placeholder"
    :error-messages="veeErrorMessage"
  ></v-select>
</template>
