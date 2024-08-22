<script setup lang="ts">
import ButtonAdapter from '@/components/button/ButtonAdapter.vue'
import CheckboxAdapter from '@/components/checkbox/CheckboxAdapter.vue'
import FileAdapter from '@/components/inputFile/FileAdapter.vue'
import InputAdapter from '@/components/inputText/InputAdapter.vue'
import ModalConfirmation from '@/components/modal/ModalConfirmation.vue'
import SelectAdapter from '@/components/select/SelectAdapter.vue'
import ValidateUser from '@/components/validateUser/ValidateUser.vue'
import { modalConfirmationStore } from '@/stores/modal/modalConfirmation'
import { regex } from '@/utils/regex'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

/**
 * schema
 */
const schema = yup.object({
  email: yup.string().email().required('Campo requerido'),
  comment: yup.string().max(500, 'Máximo 500 caracteres').required('Campo requerido'),
  phone: yup
    .string()
    .required('Campo requerido')
    .matches(regex.onlyNumbers.execute, regex.onlyNumbers.message),
  idTypeOfIdentification: yup.string().required('Campo requerido'),
  file: yup.string().required('Campo requerido'),
  fileTwo: yup.string().optional().nullable(),
  check: yup.boolean().required('Campo requerido')
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

// Se llama al store para manejar el estado del componente
const store = modalConfirmationStore()
const { open } = storeToRefs(store)

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})

const data = [
  { title: 'Cédula', value: 1 },
  { title: 'Cédula de extranjería', value: 2 },
  { title: 'Pasaporte', value: 3 }
]

const handleModal = () => {
  store.setOpen(true)
}

const handleClick = () => {
  console.log('hola')
}
</script>

<template>
  <v-container class="w-100vh d-flex justify-content-center">
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
        <ButtonAdapter :onClick="handleClick" />
        <ButtonAdapter
          width="48px"
          height="48px"
          :onlyIcon="true"
          :onClick="handleModal"
          prependIcon="mdi-cloud-upload"
        />
        <ModalConfirmation
          cancelButton="Cancelar"
          title="Titulo del modal"
          actionButton="Confirmar"
          v-model:modelValue="open"
          description="¿Está seguro de que desea continuar?"
        />
        <v-row>
          <v-col xs="12" sm="10" md="4">
            <InputAdapter
              id="email"
              type="text"
              name="email"
              label="Email"
              placeholder="Email"
              :schema="schema.fields.email"
            />
          </v-col>

          <v-col xs="12" sm="10" md="4">
            <InputAdapter
              id="phone"
              type="text"
              name="phone"
              label="Teléfono"
              placeholder="Teléfono"
              :schema="schema.fields.phone"
            />
          </v-col>
          <v-col xs="12" sm="10" md="4">
            <SelectAdapter
              :data="data"
              id="idTypeOfIdentification"
              name="idTypeOfIdentification"
              label="Tipo de identificación"
              placeholder="Tipo de identificación"
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
              :isLowerCase="true"
              placeholder="Comentario"
              :schema="schema.fields.comment"
            />
          </v-col>
        </v-row>
      </v-container>
      <ValidateUser />
    </form>
  </v-container>
</template>
