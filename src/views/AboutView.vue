<script setup lang="ts">
import TextField from '@/components/textField/TextField.vue'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'

const toast = useToast()

/**
 * schema
 */
const schema = yup.object({
  name: yup.string().required('Campo requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Campo requerido')
})

const { handleSubmit, errors, resetForm, validate } = useForm({
  validationSchema: schema
})

console.log(errors, 'errors')

const onSubmit = handleSubmit((values) => {
  console.log(values, 'values')
  validate().then((valid) => {
    if (valid) {
      toast.success('La data se ha guardado exitosamente.')
    }
    toast.error('Ha ocurrido un error.')
  })
  resetForm({})
})

// const onClick = () => {
//   toast.success('La data se ha guardado exitosamente.')
// }
</script>

<template>
  <Form @submit.prevent="onSubmit" :validation-schema="schema" class="about">
    <v-container>
      <v-row class="d-flex">
        <v-col xs="12" sm="6" md="6" lg="6">
          <TextField
            type="TEXT"
            name="name"
            label="Nombre"
            placeholder="Nombre"
            value="values.name"
          />
        </v-col>
        <v-col xs="12" sm="6" md="6" lg="6">
          <v-text-field>
            <v-autocomplete
              variant="outlined"
              label="Autocomplete"
              density="compact"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            />
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <button>Guardar</button>
  </Form>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
