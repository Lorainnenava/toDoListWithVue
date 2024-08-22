<script setup lang="ts">
import { TTypeFile } from '@/utils/types'
import { useField } from 'vee-validate'
import { computed } from 'vue'

// Definición de las props del componente.
const props = defineProps<{
  id: string
  schema: any
  name: string
  label?: string
  disabled?: boolean
  onChange?: (e: Event) => void
  fileType?: TTypeFile | TTypeFile[]
}>()

// Valida el campó y maneja los errores de el
const { value: fieldValue, errorMessage: veeErrorMessage } = useField(
  () => props.name,
  props.schema
)

// Propiedad computada que genera el atributo accept según los tipos de archivos permitidos.
const computedAccept = computed(() => {
  return Array.isArray(props?.fileType) ? props?.fileType?.join(',') : props?.fileType
})
</script>

<!-- Componente -->
<template>
  <v-file-input
    :id="props.id"
    class="inputFile"
    v-model="fieldValue"
    @input="props.onChange"
    :accept="computedAccept"
    :disabled="props?.disabled"
    :error-messages="veeErrorMessage"
    :label="label ?? 'Subir archivo'"
  ></v-file-input>
</template>

<style scoped>
.inputFile {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  line-height: 1;
}
</style>
