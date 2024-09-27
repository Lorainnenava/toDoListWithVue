<template>
  <v-container class="w-100vh d-flex justify-content-center align-center">
    <v-container class="pa-0" width="50%" height="100%"
      ><v-img cover src="./login.jpg"></v-img
    ></v-container>
    <v-container class="d-flex justify-content-center align-center" width="50%" height="100%">
      <form
        style="
          width: 80%;
          height: 60%;
          margin: auto;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        "
      >
        <div class="text-h4" style="color: rgb(var(--v-theme-modules))" color="layout">
          Bienvenido
        </div>
        <v-container>
          <v-row>
            <v-col xs="12" sm="12" md="12">
              <InputAdapter
                id="email"
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
                :schema="schema.fields.email"
              />
            </v-col>
            <v-col xs="12" sm="12" md="12">
              <InputAdapter
                id="password"
                type="text"
                name="password"
                label="password"
                placeholder="Password"
                :schema="schema.fields.password"
              />
            </v-col>
            <v-row width="80%" class="pa-2" display="flex" justify="end">
              <v-col xs="12" sm="6" md="5">
                <ButtonAdapter :onClick="handleClick" name="Crear cuenta" width="100%" />
              </v-col>
              <v-col xs="12" sm="6" md="5">
                <ButtonAdapter :onClick="handleClick" name="iniciar sesion" width="100%" />
              </v-col>
            </v-row>
          </v-row>
        </v-container>
      </form>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { useLoginForm } from '@/api/hooks/login/useLoginForm'
import ButtonAdapter from '@/components/button/ButtonAdapter.vue'
import InputAdapter from '@/components/inputText/InputAdapter.vue'
const { handleClick, schema } = useLoginForm()
</script>
