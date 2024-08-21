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
  prependIcon?: string
  onClick: (e?: Event) => void | Promise<void>
}>()

const { name, width, height, loading, disabled, prependIcon, onClick, hover } = props

const { smAndUp } = useDisplay()

console.log(props.hover, 'hover')

const handleClick = (e: Event) => {
  if (onClick) {
    try {
      onClick(e)
    } catch (error) {
      console.error('Error en el manejado de clic:', error)
    }
  }
}

const buttonStyle = computed(() => {
  return {
    width: width ?? '150px',
    height: height ?? '40px',
    '--hover-color': hover ?? 'var(--v-theme-secondary)'
  }
})
</script>

<template>
  <v-btn
    v-if="smAndUp"
    variant="elevated"
    :loading="loading"
    @click="handleClick"
    :style="buttonStyle"
    class="btn-hover my-4"
    :text="name ?? 'Button'"
    :prepend-icon="prependIcon"
    :color="color || 'primary'"
    :disabled="loading || disabled"
  >
  </v-btn>

  <v-btn
    v-else
    :icon="prependIcon"
    @click="handleClick"
    :disabled="disabled"
    :style="buttonStyle"
    :color="color || 'primary'"
  ></v-btn>
</template>

<!-- <style scoped>
.btn-hover {
  color: white;
}

.btn-hover:hover {
  background-color: rgb(var(--v-theme-secondary)) !important;
}
</style> -->
