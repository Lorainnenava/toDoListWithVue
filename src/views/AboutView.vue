<script setup lang="ts">
import CustomInput from '@/components/customInput.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

/**
 * schema
 */
const schema = yup.object({
  email: yup.string().max(5, 'Máximo 5 caracteres.').required('Campo requerido'),
  name: yup.string().required()
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <form @submit="onSubmit">
    <CustomInput
      name="email"
      :schema="schema.fields.email"
      :validations="{ max: 5, upperCase: true }"
    />
    <button>Guardar</button>
  </form>
</template>
