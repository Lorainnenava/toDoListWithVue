<script setup lang="ts">
import InputAdapter from '@/components/inputText/InputAdapter.vue'
import SelectAdapter from '@/components/select/SelectAdapter.vue'
import ValidateUser from '@/components/validateUser/ValidateUser.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

/**
 * schema
 */
const schema = yup.object({
  email: yup.string().max(5, 'Máximo 5 caracteres.').required('Campo requerido'),
  comment: yup.string().required('Campo requerido'),
  phone: yup.string().required('Campo requerido'),
  idTypeOfIdentification: yup.string().required('Campo requerido')
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})

const data = [
  { title: 'Cédula', value: 1 },
  { title: 'Cédula de extranjería', value: 2 },
  { title: 'Pasaporte', value: 3 }
]
</script>

<template>
  <form @submit="onSubmit">
    <InputAdapter
      type="text"
      name="email"
      label="Email"
      :schema="schema.fields.email"
      :validations="{ max: 5, upperCase: true }"
      placeholder="Email"
    />
    <InputAdapter
      type="textarea"
      name="comment"
      label="Comentario"
      :schema="schema.fields.comment"
      :validations="{ max: 10, onlyLetters: true }"
      placeholder="Comentario"
    />
    <InputAdapter
      type="text"
      name="phone"
      label="Teléfono"
      :schema="schema.fields.phone"
      :validations="{ max: 10, onlyNumbers: true }"
      placeholder="Teléfono"
    />
    <SelectAdapter
      name="idTypeOfIdentification"
      label="Tipo de identificación"
      placeholder="Tipo de identificación"
      :data="data"
      :schema="schema.fields.idTypeOfIdentification"
    />
    <ValidateUser />
    <button>Guardar</button>
  </form>
</template>
