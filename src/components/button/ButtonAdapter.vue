<script setup lang="ts">
// Definición de las props del componente.
const props = defineProps<{
  name?: string
  width?: string
  height?: string
  loading?: boolean
  disabled?: boolean
  prependIcon?: string
  onClick?: (e: Event) => void
}>()

import { useDisplay } from 'vuetify'

const { smAndUp } = useDisplay()
</script>

<template>
  <v-btn
    v-if="smAndUp"
    variant="elevated"
    class="btn-hover my-4"
    @click="props.onClick"
    :loading="props.loading"
    :disabled="props.loading"
    :text="props.name ?? 'Button'"
    :width="props.width ?? '150px'"
    :height="props.height ?? '40px'"
    :prepend-icon="props.prependIcon"
  >
  </v-btn>

  <v-btn :icon="props.prependIcon" v-else></v-btn>
</template>

<style scoped>
.btn-hover {
  color: white;
}

.btn-hover:hover {
  background-color: rgb(var(--v-theme-secondary)) !important;
}
</style>
