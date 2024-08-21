<script setup lang="ts">
import ButtonAdapter from '../button/ButtonAdapter.vue'

// Definición de las props del componente.
const props = defineProps<{
  name?: string
  icon?: string
  modelValue: boolean
  title?: string
  loading?: boolean
  disabled?: boolean
  close?: () => void
  description?: string
  actionButton?: string
  cancelButton?: string
  handleDelete?: () => void
}>()

// Define el evento que emitirá la actualización de `open`.
const emit = defineEmits(['update:modelValue'])

console.log(props.modelValue, 'xd')
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    width="500"
    persistent
  >
    <v-card class="bg-white">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h6 text-medium-emphasis ps-2">
          {{ props.title }}
        </div>
        <v-btn
          icon="mdi-close"
          @click="props.close ? props.close() : emit('update:modelValue', false)"
          variant="text"
        ></v-btn>
      </v-card-title>
      <v-card-text>
        {{ props.description }}
      </v-card-text>
      <v-container style="display: flex; padding: 16px; justify-content: flex-end; gap: 5px">
        <ButtonAdapter
          width="10px"
          color="confirmation"
          hover="confirmationHover"
          @click="props.close ? props.close() : emit('update:modelValue', false)"
          :loading="props.loading"
          v-if="props.cancelButton"
          :text="props.cancelButton"
          :disabled="props.disabled"
        />
        <ButtonAdapter
          width="10px"
          color="delete"
          :loading="props.loading"
          :disabled="props.disabled"
          :name="props.actionButton"
          @click="props.close ? props.close() : emit('update:modelValue', false)"
        />
      </v-container>
    </v-card>
  </v-dialog>
</template>
