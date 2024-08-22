<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref } from 'vue'

// Definición de las props del componente.
const props = defineProps<{
  id: string
  schema: any
  name: string
  label: string
  disabled?: boolean
  placeholder?: string
  onChange?: (e: Event) => void
  data?: { title: string; value: any }[]
}>()

const {
  value: fieldValue,
  errorMessage: veeErrorMessage,
  handleBlur: onBlur,
  handleChange: onChange
} = useField(() => props?.name, props?.schema)

/**
 * @function handleChange
 * @param e
 */
const handleChange = (e: Event) => {
  onChange(e)

  if (props.onChange) props.onChange(e)
}

// Data del input
const dataInput = ref(props?.data && props?.data?.length ? props?.data : [])
</script>

<!-- Componente -->
<template>
  <v-select
    clearable
    :id="props.id"
    @onBlur="onBlur"
    :name="props.name"
    :items="dataInput"
    item-text="title"
    item-value="value"
    variant="outlined"
    :label="props.label"
    v-model="fieldValue"
    @onchange="handleChange"
    :disabled="props.disabled"
    no-data-text="No hay data"
    :placeholder="props.placeholder"
    :error-messages="veeErrorMessage"
  ></v-select>
</template>
