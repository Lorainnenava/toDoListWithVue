<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

// Definición de las props del componente.
const props = defineProps<{
  name?: string
  color?: string
  hover?: string
  width?: string
  height?: string
  loading?: boolean
  disabled?: boolean
  onlyIcon?: boolean
  prependIcon?: string
  onClick: (e?: Event) => void | Promise<void>
}>()

const {
  name,
  color,
  width,
  hover,
  height,
  loading,
  onClick,
  disabled,
  prependIcon,
  onlyIcon = false
} = props

const { smAndUp } = useDisplay()

const buttonStyle = computed(() => {
  return {
    width: width || '150px',
    height: height ?? '40px',
    '--hover-color': hover ? hover : 'var(--v-theme-secondary)'
  }
})
</script>

<template>
  <v-btn
    v-if="onlyIcon"
    @click="onClick"
    variant="elevated"
    :loading="loading"
    :icon="prependIcon"
    :style="buttonStyle"
    class="btn-hover my-4"
    :color="color || 'primary'"
    :disabled="loading || disabled"
  ></v-btn>

  <v-btn
    v-else-if="!onlyIcon && smAndUp"
    @click="onClick"
    variant="elevated"
    :loading="loading"
    :style="buttonStyle"
    class="btn-hover my-4"
    :text="name || 'Button'"
    :color="color || 'primary'"
    :disabled="loading || disabled"
    :prepend-icon="!smAndUp && prependIcon"
  >
  </v-btn>

  <v-btn
    v-else
    @click="onClick"
    variant="elevated"
    :loading="loading"
    :icon="prependIcon"
    :style="buttonStyle"
    class="btn-hover my-4"
    :color="color || 'primary'"
    :disabled="loading || disabled"
  ></v-btn>
</template>

<style scoped>
.btn-hover {
  color: white;
}

.btn-hover:hover {
  background-color: rgb(var(--hover-color)) !important;
}
</style>
