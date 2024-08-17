import '../public/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import colors from '../public/styles/colorPalette'

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
          textError: colors.textError
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

app.use(vuetify)

app.use(Toast, options)

app.mount('#app')
