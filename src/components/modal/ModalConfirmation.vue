<script setup lang="ts">
import ButtonAdapter from '../button/ButtonAdapter.vue'

// Definición de las props del componente.
const props = defineProps<{
  name?: string
  icon?: string
  title?: string
  loading?: boolean
  disabled?: boolean
  close?: () => void
  modelValue: boolean
  description?: string
  actionButton?: string
  cancelButton?: string
  handleDelete?: () => void
}>()

// Define el evento que emitirá la actualización de `open`.
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <v-dialog
    persistent
    width="500"
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="bg-white">
      <v-card-title style="height: 45px" class="d-flex justify-space-between align-center pa-0">
        <!-- Tittle -->
        <div class="text-h6 font-weight-medium ps-3">
          {{ props.title }}
        </div>
        <!-- Close button -->
        <v-btn
          color="black"
          variant="text"
          icon="mdi-close"
          @click="emit('update:modelValue', false)"
        ></v-btn>
      </v-card-title>
      <!-- Description -->
      <v-card-text class="pt-4 px-4 pb-5">
        {{ props.description }}
      </v-card-text>
      <v-container class="d-flex justify-end ga-2 py-0 px-4">
        <!-- Cancel button -->
        <ButtonAdapter
          width="auto"
          color="cancel"
          :loading="props.loading"
          v-if="props.cancelButton"
          :text="props.cancelButton"
          :disabled="props.disabled"
          hover="var(--v-theme-cancelHover)"
          @click="emit('update:modelValue', false)"
        />
        <!-- Confirmation button -->
        <ButtonAdapter
          width="auto"
          :loading="props.loading"
          :disabled="props.disabled"
          :name="props.actionButton"
          @click="emit('update:modelValue', false)"
        />
      </v-container>
    </v-card>
  </v-dialog>
</template>
