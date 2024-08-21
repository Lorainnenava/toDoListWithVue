import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueQueryPlugin } from 'vue-query'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '../public/assets/main.css'
import colors from '../public/styles/colorPalette'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'default'
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: colors.primary,
          secondary: colors.secondary,
          layout: colors.layout,
          background: colors.background,
          modules: colors.modules,
          text: colors.text,
          textError: colors.textError,
          delete: colors.delete,
          deleteHover: colors.deleteHover,
          confirmation: colors.confirmation,
          confirmationHover: colors.confirmationHover
        }
      }
    }
  }
})

const app = createApp(App)

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
  pauseOnHover: true,
  closeButton: false
}

app.use(createPinia())

app.use(router)

app.use(VueQueryPlugin)

app.use(vuetify)

app.use(Toast, options)

app.mount('#app')
