<script setup lang="ts">
import ButtonAdapter from '@/components/button/ButtonAdapter.vue'
import CheckboxAdapter from '@/components/checkbox/CheckboxAdapter.vue'
import FileAdapter from '@/components/inputFile/FileAdapter.vue'
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
  idTypeOfIdentification: yup.string().required('Campo requerido'),
  file: yup.string().required('Campo requerido'),
  fileTwo: yup.string().optional().nullable(),
  check: yup.boolean().required('Campo requerido')
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
  <v-container class="w-100vh mt-14">
    <form
      @submit="onSubmit"
      style="
        background-color: #eae6e8;
        width: 70%;
        margin: auto;
        border-radius: 10px;
        padding: 10px;
      "
    >
      <v-container>
        <ButtonAdapter />

        <v-row>
          <v-col xs="12" sm="10" md="4">
            <InputAdapter
              id="email"
              type="text"
              name="email"
              label="Email"
              :schema="schema.fields.email"
              :validations="{ max: 5, upperCase: true }"
              placeholder="Email"
            />
          </v-col>

          <v-col xs="12" sm="10" md="4">
            <InputAdapter
              id="phone"
              type="text"
              name="phone"
              label="Teléfono"
              :schema="schema.fields.phone"
              :validations="{ max: 10, onlyNumbers: true }"
              placeholder="Teléfono"
            />
          </v-col>
          <v-col xs="12" sm="10" md="4">
            <SelectAdapter
              id="idTypeOfIdentification"
              name="idTypeOfIdentification"
              label="Tipo de identificación"
              placeholder="Tipo de identificación"
              :data="data"
              :schema="schema.fields.idTypeOfIdentification"
            />
          </v-col>
          <v-col xs="12" sm="10" md="4">
            <FileAdapter id="file" name="file" :schema="schema.fields.file" />
          </v-col>
          <v-col xs="12" sm="10" md="4">
            <FileAdapter id="fileTwo" name="fileTwo" :schema="schema.fields.fileTwo" />
          </v-col>
          <CheckboxAdapter label="Revisado" id="check" name="check" :schema="schema.fields.check" />
          <v-col xs="12" sm="12" md="12">
            <InputAdapter
              id="comment"
              name="comment"
              type="textarea"
              label="Comentario"
              placeholder="Comentario"
              :schema="schema.fields.comment"
              :validations="{ max: 10, onlyLetters: true }"
            />
          </v-col>
        </v-row>
      </v-container>
      <ValidateUser />
    </form>
  </v-container>
</template>
